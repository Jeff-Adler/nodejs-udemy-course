const chalk = require(`chalk`)
const fs = require(`fs`)

const getNotes = () => {
    return `Your notes...`
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title.toLowerCase() === title.toLowerCase())

    if (duplicateNotes.length <= 0) {
        notes.push({
            title : title,
            body : body,
        })
        saveNotes(notes)
        console.log(`New note added!`)
    } else {
        console.log(`Note title taken.`)
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync(`notes.json`, dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()

    const truncatedNotes = notes.filter((note) => note.title.toLowerCase() != title.toLowerCase())

    if (notes.length === truncatedNotes.length) {
        console.log(chalk.red(`Could not locate note with title '${title}'.`))
    } else {
        saveNotes(notes)
        console.log(chalk.green(`Note removed.`))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(`notes.json`)
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch (e) {
        return []
    }
}

module.exports={getNotes: getNotes, addNote: addNote, removeNote: removeNote}