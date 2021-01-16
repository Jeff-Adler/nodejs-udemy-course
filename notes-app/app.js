// const chalk = require(`chalk`)
const yargs = require(`yargs`)
const notes = require(`./notes.js`)

console.log(notes.getNotes())

yargs
    //Add a note
    .command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
            },
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            notes.addNote(argv.title, argv.body)
        }
    })
    //Remove a note
    .command({
        command: 'remove',
        describe: 'Remove a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
            },
        },
        handler: (argv) => {
            notes.removeNote(argv.title)
        }
    })
    //List a note
    .command({
        command: 'list',
        describe: 'List your notes',
        handler: () => {
            console.log(`Listing out all notes`)
        }
    })
    //Read a note
    .command({
        command: 'read',
        describe: 'Read a note',
        handler: () => {
            console.log(`Reading a note`)
        }
    })

yargs.parse()