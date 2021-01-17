const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location. See Express docs to look up 'view engine' and 'views' keywords
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    //looks for corresponding .hbs file in /views. Automatically appends .hbs filepath
    res.render('index', {
        title: 'Weather',
        name: 'Jeff Adler'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jeff Adler'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jeff Adler',
        message: 'Help!',
    })
})

app.get('/weather', (req,res) => {
    const {address} = req.query

    if (!address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    res.send({
        forecast: 'Cloudy',
        location: 'New York',
        address
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Jeff Adler',
        message: 'Help article not found',
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Jeff Adler',
        message: 'Page not found',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})