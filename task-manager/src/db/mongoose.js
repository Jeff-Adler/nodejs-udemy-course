const mongoose = require(`mongoose`)

const db = mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    }, 
    age: {
        type: Number
    }
})

mongoose.connection.close()

// const me = new User({
//     name: 'Jeff',
//     age: 30,
// })

// me.save()
// .then(() => console.log(me))
// .catch((error) => console.log("Error!", error))