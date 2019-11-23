const request = require('request')
const constants = require('./constants.js')
const geocode = (location, callback) => {
    const url = constants.urls.mapServiceBaseUrl + '/' + location + constants.placeSuffix
    request(
        {
            url,
            json: true,
            useQueryString: true,
            qs: {
                access_token: constants.keys.mapServiceKey,
                limit: 1
            }
        }, (serverError, response, { message, features }) => {
            if (serverError) {
                callback(constants.errorMessages.connectivity, undefined)
                return
            } else if (message || features.length === 0) {
                callback(constants.errorMessages.location, undefined)
            } else {
                callback(undefined, {
                    lat: features[0].center[1],
                    long: features[0].center[0],
                    location: features[0].place_name
                })
            }
        }
    )
}

module.exports = geocode