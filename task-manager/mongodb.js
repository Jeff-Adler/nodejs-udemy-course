// const mongodb = require(`mongodb`)
// const MongoClient = mongodb.MongoClient

// const connectionURL = `mongodb://127.0.0.1:27017`
// const databaseName = `task-manager`

// MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
//     if (error) return console.log(`Unable to connect to database!`)

//     console.log(`Connected correctly!`)
// })

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'task-manager';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect((error,client) => {
    if (error) return console.log(`Unable to connect to database!`)
    console.log(`Connected to database successfully`)

    const db = client.db(dbName);

    // db.collection(`users`).insertOne({
    //     name: `Jeff`,
    //     age: 30,
    // }, (error, result) => {
    //     if (error) {
    //         return console.log(`Unable to insert user`)
    //     }

    //     console.log(result.ops)
    // })

    // db.collection(`users`).insertMany([
    //     {
    //         name: `Chris`,
    //         age: 33,
    //     },
    //     {
    //         name: `Ellie`,
    //         age: 24,
    //     },
    //     {
    //         name: `Katsuhiro`,
    //         age: 345,
    //     },
    // ], (error, result) => {
    //     if (error) return console.log(`Unable to insert user`)
    //     console.log(result.ops)
    // })

    db.collection(`tasks`).insertMany([
        {
            description: `Run errands`,
            completed: false,
        },
        {
            description: `Exercise`,
            completed: true,
        },
        {
            description: `Leetcode`,
            completed: false,
        },
    ], (error,result) => {
        if (error) return console.log(`Unable to insert user`)
        console.log(result.ops)
    })
  
    // client.close();
  });