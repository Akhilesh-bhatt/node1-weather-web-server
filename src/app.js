const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akhilesh Bhatt'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Akhilesh Bhatt'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This some helpful message.',
        name: 'Akhilesh Bhatt'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "You must provide a address term"
        })
    }

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        name: 'Akhilesh Bhatt',
        title: '404',
        errorMsg: 'Help page not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        name: 'Akhilesh Bhatt',
        title: '404',
        errorMsg: '404 page not found!'
    })
})

app.listen(port, () => {
    console.log(`Server starts at port ${port}`);
})