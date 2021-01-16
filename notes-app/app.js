const chalk = require(`chalk`)
const yargs = require(`yargs`)
const getNotes = require(`./notes.js`)

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
            console.log(`Title: ` + argv.title + `\nBody: ` + argv.body)
        }
    })
    //Remove a note
    .command({
        command: 'remove',
        describe: 'Remove a note',
        handler: () => {
            console.log(`Removing the note`)
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