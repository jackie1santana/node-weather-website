const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//hbs.registerPartials(partialsPath) is hwo you set the path to your partials
// in terminal run nodemon src/app.js -e js,hbs when using partials
app.use(express.static(publicDirectoryPath))



//app.use is a way to customize your server
//app.get is for routing
// use app.set to set up a view engine for dynamic template

//**********/
//const viewsPath = path.join(__dirname, '../templates')
// app.set('views', viewsPath)
//change 'view' to 'template' and then use app.set to set changes..now express will look for 'templates' instead of 'view'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jackie Santana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jackie Santana'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, ({error: geoError}, {latitude, longitude, location} = {}) => {
        if(geoError){
             return res.send({ geoError })
        }
    
    
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
              return console.log(error)
          }

          res.send({
            forecast: forecastData, 
            location: location,
            address: req.query.address
        })

    })
    }) 
    })



app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'help',
        name: 'Jackie Santana'
    })
})
 

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }


    console.log(req.query)
    res.send({
        products: []
    })
})

//res.send sends info back to the requestor

app.get('/help/units', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article Not Found',
        title: 'help',
        name: 'Jackie Santana'
    })
})

//Error 404
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        title: 'help',
        name: 'Jackie Santana'
    })
})

app.get('', (req, res) => {

})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
//app.listen starts up the server