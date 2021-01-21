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

const Task = require('./models/task')

const User = require('./models/user')


const main = async () => {
    // const task = await Task.findById('6009912ad89ec5768b780b89')
    // //populates the owner field of task with the information in its referent, who we specific in Task as User
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('6008c0348a13a96a58180305')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

// main()