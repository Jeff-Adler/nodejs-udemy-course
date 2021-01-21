const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    //tokens is an array of objects of single key-value pairs _id: , token: 
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Establishes ActiveRecord assoication between User and their Tasks
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//essentially a serializer that removes password and tokens for all routes that send back user data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()  

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//methods: mongoose keyword to create instance method for model
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisasecret')

    //this will allow a user to e.g. stay signed in via mobile, even if they sign out on desktop, because token value is saved to document
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//static function on userSchema, which we will be able to call on User.
//statics: mongoose keyword to create static function you call directly on Model (in other words, static, but for mongoose models)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    //No user is found with given email
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    //User with given email is found, but given password does not match found user's password
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash plain text password on user creation/update
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8)

    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User