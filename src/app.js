const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory)) 

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Geo Nicolaidis'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Geo Nicolaidis'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        helpText:'This is the help message',
        name: 'Geo Nicolaidis'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Address is required!'
        })
    }
    
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecastData: forecastData,
                location,                
                address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404 Article not found',
        name:'Geo Nicolaidis',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404 Page not found',
        name:'Geo Nicolaidis',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 