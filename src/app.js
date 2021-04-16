const path = require('path');
const express = require('express');

const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//process.env.PORT - heroku environment port
const port = process.env.PORT || 3000;

//ruta za express config
const publicDirPath = path.join(__dirname, '../public');
//handlebar trazi da hbs fajlovi budu unutar views foldera
//koristimo kada zelimo da promenimo rutu hbs fajlova
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//da bi ucitao index.hbs mora ovaj blok da se unese
const path1 = path.join(__dirname, '../views');
app.set('views', path1)
/////////////

//podesavanje handlebar engina
app.set('view engine', 'hbs')
//izmena rute view-a
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//podesavanje statickog direktorijuma koje ce server prikazati
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Soki'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Soki'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error odio provident impedit nesciunt dolor aperiam sit adipisci iusto hic quod dolores at vel doloribus eius porro, accusantium quaerat repellat deleniti.',
        title: 'Help',
        name: 'Soki'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(lat, long, (error, forcastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
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

app.get('/help/*', (rq, res) => {
    res.render('error', {
        title: '404 ERROR',
        errorText: 'Help article not found!'})
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 ERROR',
        errorText: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
