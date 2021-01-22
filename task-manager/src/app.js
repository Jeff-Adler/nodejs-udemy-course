const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// parses body of incoming requests as json
app.use(express.json())
// uses routes defined in userRouter and taskRouter
app.use(userRouter)
app.use(taskRouter)

module.exports = app