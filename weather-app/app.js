
const request = require(`postman-request`)

const url = `http://api.weatherstack.com/current?access_key=339699be72c5f4f7cb7f52f8bbf3168b&query=37.8267,-122.4233&units=f`

request({url : url, json: true}, (error, response) => {
    if (error) {
        console.log(`Unable to connect to weather services.`)
    } else if (response.body.error) {
        console.log(`Unable to find location.`)
    } else {
        console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`)
    }
})

const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamFwbGlza2luIiwiYSI6ImNrazE3bWM4dzBvaXYyb3QxcmRlaG10aDAifQ.NKvj5Bde9ScJ_aGRtXGcog&limit=1`

request({url:geocodingURL, json:true}, (error,response) => {
    if (error) {
        console.log(`Unable to connect to location services.`)
    } else if (response.body.features.length === 0) {
        console.log(`Unable to find location. Try another search.`)
    } else {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(`Latitude: ${latitude}`)
        console.log(`Longitude: ${longitude}`)
    }
})
