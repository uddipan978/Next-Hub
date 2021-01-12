const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const cors = require("cors");
const users = require('./routes/users');
const auth = require('./routes/auth');
const influencerOffers = require('./routes/influenceroffers')
// const userSocial = require('./routes/userSocial')
const socialAccounts = require('./routes/socialAccounts')
const express = require('express');


const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/NextHub_DataBase')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
//cors middleware to allow parse json b/c our server is sending and recieving JSON//
app.use(cors());

app.use(express.json());
app.use(express.static(__dirname + "./upload"));
app.use('/upload', express.static('upload'));
app.use('/images', express.static('images'));



app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/infulencerOffer', influencerOffers);
// app.use('/api/userSocial',userSocial)
app.use('/api/social',socialAccounts)



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));