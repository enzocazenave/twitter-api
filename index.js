const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const logger = require('morgan');

const app = express();

dbConnection();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(logger('dev'));

app.use('/api', require('./routes/tweets'));
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`\nSTARTING SERVER\n✔  http://localhost:${ process.env.PORT }`);
});