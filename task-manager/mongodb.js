const { MongoClient, ObjectID } = require('mongodb')

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'task-manager';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect((error,client) => {
    if (error) return console.log(`Unable to connect to database!`)

    const db = client.db(dbName);

    // db.collection(`users`).findOne({ _id: new ObjectID('6005a1b9aa8466094d6d6052') }, (error, user) => {
    //     if (error) return console.log(`Unable to fetch`)
    //     console.log(user)
    // })

    // db.collection(`users`).find({age : 30}).toArray((error, documents) => {
    //     console.log(documents)
    // })

    db.collection(`tasks`).findOne({ _id : new ObjectID("60059ddc4cf01e0846360bfa")}, (error, task) => {
        if (error) return console.log(`Unable to fetch`)
        console.log(task)
    })

    db.collection(`tasks`).find({ completed : false }).toArray((error, documents) => {
        console.log(documents)
    })

    // client.close();
  });