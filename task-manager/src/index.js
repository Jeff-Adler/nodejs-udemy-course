//index.js and app.js are separated so that index simply sets up the port, but app runs the app. This way, we can test endpoints without having
//to start the server
const app = requires('./app')

// 3000 value for port is retrieved from config/dev.env
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})