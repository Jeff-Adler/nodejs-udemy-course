
const request = require(`postman-request`)

const url = `http://api.weatherstack.com/current?access_key=339699be72c5f4f7cb7f52f8bbf3168b&query=37.8267,-122.4233`

request({url : url}, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.current)
})