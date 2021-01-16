const chalk = require(`chalk`)
const fs = require(`fs`)

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title.toLowerCase() === title.toLowerCase())

    if (!duplicateNote) {
        notes.push({
            title : title,
            body : body,
        })
        saveNotes(notes)
        console.log(chalk.green.inverse(`New note added!`))
    } else {
        console.log(chalk.red.inverse(`Note title taken.`))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync(`notes.json`, dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()

    const truncatedNotes = notes.filter((note) => note.title.toLowerCase() != title.toLowerCase())

    if (notes.length > truncatedNotes.length) {
        saveNotes(notes)
        console.log(chalk.green.inverse(`Note removed.`))
    } else {
        console.log(chalk.red.inverse(`Could not locate note with title '${title}'.`))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold(`Your notes...`))
    notes.forEach(note => {
        console.log(note.title)
    });
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

module.exports={addNote: addNote, removeNote: removeNote, listNotes:listNotes}