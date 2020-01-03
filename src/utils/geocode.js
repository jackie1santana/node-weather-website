const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFja2llc2FudGFuYSIsImEiOiJjazQ4dXczd2IxOXd6M2VuNjliamhrZXg2In0.f1mca-KowMtSV757I8TrDQ'

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0) {
            callback('Unable to find location. Try to find another search', undefined)
        } else {
            callback('undefined', {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode