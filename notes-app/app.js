// const chalk = require(`chalk`)
const yargs = require(`yargs`)
const notes = require(`./notes.js`)

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
        handler (argv) {
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
        handler (argv) {
            notes.removeNote(argv.title)
        }
    })
    //List a note
    .command({
        command: 'list',
        describe: 'List your notes',
        handler () {
            notes.listNotes()
        }
    })
    //Read a note
    .command({
        command: 'read',
        describe: 'Read a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
            },
        },
        handler (argv) {
            notes.readNote(argv.title)
        }
    })

yargs.parse()