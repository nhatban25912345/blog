const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyparser.json());

var token = "abc" + Math.floor(Math.random() * 1000);
setInterval(() => {
    token = "abc" + Math.floor(Math.random() * 1000);
}, 1200000);


const user = { id: '123', username: 'sonnguyen', name: 'Son Nguyen' };
const token = 'abc123';

app.get('/profile', (req, res) => {
	if (req.query.token != token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	return res.json({ user });
});

app.post('/login', (req, res) => {
	const { username, password } = req.body;
	if (username == 'sonnguyen' && password == '123456') {
		return res.json(token );
	}
	return res.status(402).json({ error: 'Invalid username or password' });
});

app.listen(8000);
