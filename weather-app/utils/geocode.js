const request = require(`postman-request`)

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFwbGlza2luIiwiYSI6ImNrazE3bWM4dzBvaXYyb3QxcmRlaG10aDAifQ.NKvj5Bde9ScJ_aGRtXGcog&limit=1`
    
    request({url : url, json : true}, (error,response) => {
        if (error) {
            callback(`Unable to connect to location services!`, undefined)
        } else if (response.body.features.length === 0) {
            callback(`Unable to find location. Try another search.`, undefined)
        } else {
            const [longitude, latitude] = response.body.features[0].center
            const {place_name: location} = response.body.features[0]
            callback(undefined, {
                latitude,
                longitude,
                location,
            })
        }
    })
}

module.exports=geocode