const fs = require('fs')

// const dataBuffer = fs.readFileSync(`1-json.json`).
// dataJSON = 

const dataBuffer = fs.readFileSync('1-json.json')
const person = JSON.parse(dataBuffer)
person.name = `Jeff`
person.age = 30

console.log(person)

const personJSON = JSON.stringify(person)
fs.writeFileSync(`1-json.json`,personJSON)

const dataBuffer2 = fs.readFileSync('1-json.json')
const person2 = JSON.parse(dataBuffer2)
console.log(person2)