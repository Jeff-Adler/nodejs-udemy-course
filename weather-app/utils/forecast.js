const request = require(`postman-request`)

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=339699be72c5f4f7cb7f52f8bbf3168b&query=${latitude},${longitude}&units=f`

    request({url : url, json : true}, (error, response) => {
        if (error) {
            callback(`Unable to connect to weather services.`, undefined)
        } else if (response.body.error) {
            callback(`Unable to find location.`, undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike,
                weatherDescriptions: response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports=forecast