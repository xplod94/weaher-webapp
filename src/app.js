const path = require('path')
const express = require('express')
const hbs = require('hbs')
const constants = require('./utils/constants.js')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()

const name = 'Pranav Pande'
const icon = "/img/weather-icon.png"

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting view engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath) // If we do not set this it will use 'views' folder in the root dir by default
hbs.registerPartials(partialsPath)

// Setting the static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name,
        icon
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name,
        icon
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some helpful text',
        name,
        icon
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: constants.errorMessages.address
        })
    }

    geocode(req.query.address, (error, locationData) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(locationData.lat, locationData.long, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: locationData.location,
                weather: weatherData.summary + ' It is ' + weatherData.temperature + ' degrees out with a ' + weatherData.precipProbability + '% chance of rain.'
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('missing', {
        title: 'Help',
        errorMessage: 'Help article not found',
        name,
        icon
    })
})

app.get('*', (req, res) => {
    res.render('missing', {
        title: '404',
        errorMessage: 'Page not found.',
        name,
        icon
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})