const request = require('request')
const constants = require('./constants.js')
const forecast = (lat, long, callback) => {
    const url = constants.urls.weatherServiceBaseUrl + '/' + constants.keys.weatherServiceKey + '/' + lat + ',' + long
    request(
        {
            url,
            json: true,
            useQuerystring: true,
            qs: {
                units: constants.weatherUnit,
                exclude: 'minutely, hourly, alerts, flags'
            }
        }, (serverError, response, { error, daily, currently }) => {
            if (serverError) {
                callback(constants.errorMessages.connectivity, undefined)
            } else if (error) {
                callback(constants.errorMessages.forecast, undefined)
            } else {
                callback(undefined, {
                    summary: daily.data[0].summary,
                    temperature: currently.temperature,
                    precipProbability: currently.precipProbability
                })
            }
        }
    )
}

module.exports = forecast