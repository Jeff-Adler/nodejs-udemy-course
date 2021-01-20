const mongoose = require(`mongoose`)
const validator = require(`validator`)

const userSchema = new mongoose.Schema({
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

// custom middleware to run before user is saved
userSchema.pre('save', async function (next) {
    //references user to be saved
    const user = this

    console.log('just before saving')

    // run next stage of middleware
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User