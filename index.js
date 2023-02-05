const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

mongoose.set('strictQuery', false);
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//================
const UserRoute = require('./routes/UserRoute');
//================

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors())
//=================
const serverPort = process.env.SERVER_PORT;
mongoose.connect('mongodb://localhost:27017/robotikka_db')
    .then(() => {
        app.listen(serverPort, () => {
            console.log(`Application started on port ${serverPort}`);
        })
    }).catch(error => {
    console.log(error);
});
//=================
app.use('/api/v1/user', UserRoute);