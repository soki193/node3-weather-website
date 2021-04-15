const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=03634128a6629a6f7526545a5bb89045&query=${lat},${long}&units=m`;
    request({
        url,
        json: true
    },(error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if(body.error) {
            callback(body.error)
        } else {
            const {weather_descriptions: weather, temperature, feelslike} = body.current;
            callback(undefined, `${weather}. It is currently ${temperature} degrees. It feels like ${feelslike}.`)
        }
    })
}

module.exports = forecast;