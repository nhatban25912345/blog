// ----------------------------------------
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
// ----------------------------------------

dotenv.config();

const path = require('path');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const app = express();


// -----------------------
app.use(cors());
app.use(bodyparser.json());
// ------------------------


const route = require("./routes");
const db = require("./config/db")

// connect to db
db.connect();

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
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.get('/profile', (req, res) => {
	if (req.query.token != token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	return res.json({ user });
});


app.listen(process.env.PORT || 8000, () => console.log(`App listening at http://localhost:${process.env.PORT}`));
