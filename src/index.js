const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const app = express();
const port = 3000;

const hbs = create({extname: '.hbs'})

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/search', (req, res) => {
    console.log(req.query.q);
    res.render('search');
});

app.post('/search', (req, res) => {

    console.log(req.body);

    res.send("");
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));