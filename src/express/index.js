const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('../routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

module.exports = app;

