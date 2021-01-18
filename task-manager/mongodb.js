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

    db.collection(`tasks`).deleteOne({ _id: new ObjectID("6004e996747945ff9ccf5861")})
    .then((result) => console.log(result))
    .catch((error) => console.log(error))

  });