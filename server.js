
require('dotenv').config();

const express = require('express');
//const http = require('http');
const app = express();
const PORT = process.env.PORT || 80;
const path = require('path');
const cors = require('cors');


// Cors 
const corsOptions = 
{
  origin: process.env.ALLOWED_CLIENTS.split(',')
}


app.use(cors(corsOptions))
app.use(express.static('public'));


const connectDB = require('./config/db');
connectDB();


//Explictly use to parse json data
app.use(express.json());

//Download---page
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');


//API---Routes 
app.get('/', function(req, res, next){
  res.render('./index.html');
});

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, console.log(`Listening on PORT ${PORT}.`)); 