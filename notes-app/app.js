const chalk = require(`chalk`)
const yargs = require(`yargs`)
const getNotes = require(`./notes.js`)

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: () => {
        console.log(`Adding a new note!`)
    }
})

//Remove a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: () => {
        console.log(`Removing the note`)
    }
})

//List a note
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => {
        console.log(`Listing out all notes`)
    }
})

//Read a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: () => {
        console.log(`Reading a note`)
    }
})



// add, remove, read, list notes


console.log(yargs.argv)