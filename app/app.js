require('dotenv').config('../.env');
const express = require('express');
const {errorHandler, notFoundHandler} = require('./error')
const app = express();


const myDB = require('../db/db')

myDB.create('user 1', 10)
myDB.create('user 2', 10)
const bulk = myDB.bulkCreate('user 3', 10, 3);
console.log(bulk);

const tickets = myDB.find()
console.log('All Tickets', tickets);

const winners = myDB.draw(3)
console.log('winners', winners);


 
app.use(require('./middleware'));
app.use(require('./routes'));
app.use(notFoundHandler);
app.use(errorHandler);
module.exports = app;