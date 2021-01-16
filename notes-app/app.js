const fs = require('fs')

fs.writeFileSync(`notes.text`, 'My name is Jeff.\n')

fs.appendFileSync('notes.text', 'I am learning Node.js');