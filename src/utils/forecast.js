const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5abf12e75f7516f76fe1069a6eae5cec/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to forecast API', undefined)
        } else if(body.error) {
            callback('Unable to connect to weather service', undefined)
        }else {
            callback(undefined, `There will be ${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% of rain`)
        }
    })

  
}

module.exports = forecast