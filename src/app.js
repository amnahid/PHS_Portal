
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const controller = require('./routes/routes');


const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Database Connect
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/phs_portal')
  .then(() => console.log('DB Connected!'));

app.use("/api", controller) // post controllers

app.use((err, req, res, next) => {
  res.status(500).json({
    data: null,
    // message: "Server request failed"
    message: err._message
  })
})

module.exports = app