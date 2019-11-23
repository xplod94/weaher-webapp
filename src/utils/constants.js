const constants = {
    errorMessages: {
        connectivity: 'Unable to connect to server.',
        forecast: 'Unable to find weather forecast for the given location.',
        location: 'Unable to find the given location.',
        address: 'Please enter an address.'
    },
    keys: {
        mapServiceKey: 'pk.eyJ1IjoieHBsb2Q5NCIsImEiOiJjazMwY2R5NGswcHpsM3BvbTc2b2dnbnU0In0.3_0KfYYYkjXUJbPN80Iftg',
        weatherServiceKey: 'ca0a2f29deec0163794f44a0ab3d9bf2'
    },
    placeSuffix: '.json',
    urls: {
        mapServiceBaseUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
        weatherServiceBaseUrl: 'https://api.darksky.net/forecast',
    },
    weatherUnit: 'ca'
}

module.exports = constants;