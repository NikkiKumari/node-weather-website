const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define express config
const publicDirectory = express.static(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

// setup handlerbars enginer and vires location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialPaths)

//Setup static directory to serve
app.use(publicDirectory);

app.get('', (req, res)=>{
    res.render('index' , {
        title: 'Weather App',
        name: 'Nikki'
    })
});

app.get('/about', (req,res)=>{
   res.render('about',{
       title: 'About me',
       name:'Nikki'
   })
});

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'help page',
        message:'created by nikki',
        name:'Nikki'
    })
});

app.get('/weather', (req, res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error : 'You must provide address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData = {}) => {
            if (error) {
                return res.send({error})
            }
            res.send({forecastData , location})
        })
    });

});



app.get('/products', (req, res)=>{
    res.send({
        products: []
    })
});

app.get('/help/*', (req,res)=>{
    res.render('noFound', {
        message: 'Help article not found'
    })
});

app.get('*',(req, res)=>{
    res.render('noFound', {
        message: 'my 404 page'
    });
});

app.listen(port, ()=>{
    console.log('Server is up on port', port);
});
