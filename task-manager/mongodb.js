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

    db.collection(`users`).updateOne({ _id: new ObjectID("6004e6a8113fd2fed7f16e0a") }, {
        $set: {
            name : 'John'
        }
    })
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
  });