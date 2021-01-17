
const request = require(`postman-request`)

const url = `http://api.weatherstack.com/current?access_key=339699be72c5f4f7cb7f52f8bbf3168b&query=37.8267,-122.4233`

request({url : url, json: true}, (error, response) => {
    console.log(response.body.current.weather_descriptions + ' It is currently ' + 
    response.body.current.temperature + ' degrees out.')
})
