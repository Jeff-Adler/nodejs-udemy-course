const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// parses body of incoming requests as json
app.use(express.json())
// uses routes defined in userRouter and taskRouter
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisisasecretkey', { expiresIn : '7 days'} )
    console.log(token)

    const data = jwt.verify(token, 'thisisasecretkey')
    console.log(data)
}

myFunction()