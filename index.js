const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

mongoose.set('strictQuery', false);
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
    }).catch(error=>{
    console.log(error);
})