const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on: http://localhost:${ process.env.PORT }`);
});