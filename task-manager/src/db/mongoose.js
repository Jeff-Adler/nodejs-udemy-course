const mongoose = require(`mongoose`)
const validator = require(`validator`)

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error (`Email is invalid`)
            }
        }
    },
    age: {
        type: Number,
        default:0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

const me = new User({
        name: 'James',
        age: 74,
        email: "james.bilbo@gmail.com",
        password: "7777777"
    })

me.save()
.then((data) => console.log(data))
.catch((error) => console.log("Error!", error))

// const Task = mongoose.model('Task',{
//     description: {
//         type: String,
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         required: true
//     },
// })

// const task1 = new Task({
//     description: 'Leetcode',
//     completed: false
// })

// task1.save()
// .then(() => console.log(task1))
// .catch((error) => console.log("Error!", error))


// mongoose.connection.close()