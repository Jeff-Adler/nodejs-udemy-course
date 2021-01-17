const geocode = require(`./utils/geocode`)
const forecast = require(`./utils/forecast`)

geocode(`New York`, (error,data) => {
    console.log(`Error: `, error)
    console.log(`Data: `, data)
})

forecast(37.765, -122.241, (error,data) => {
    console.log(`Error: `, error)
    console.log(`Data: `, data)
})