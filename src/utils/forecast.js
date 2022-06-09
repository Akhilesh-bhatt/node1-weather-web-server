const request = require('request')

const forecast = (long, lat, callback) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=a82d79e4ce484bf9a9f61050220706&q=${lat},${long}&aqi=no&days=1&alerts=yes`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect forecast services', undefined)
        } else if (body.error) {
            callback(body.error.message, undefined)
        } else {
            callback(undefined, `It is currently ${body.current.temp_c} degree in ${body.location.name}. There is ${body.forecast.forecastday[0].day.daily_will_it_rain}% chances of rain.`)
        }
    })
}

module.exports = forecast