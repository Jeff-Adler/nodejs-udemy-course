const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
// 3000 value for port is retrieved from config/dev.env
const port = process.env.PORT

// parses body of incoming requests as json
app.use(express.json())
// uses routes defined in userRouter and taskRouter
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})