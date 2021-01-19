const express = require('express')
require('./db/mongoose')
const User = require('./models/User')

//Set up express server
const app = express()
const port = process.env.PORT || 3000

//Parse incoming JSON requests
app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch(() => {

    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})