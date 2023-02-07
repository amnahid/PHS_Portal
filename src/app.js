
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const controller = require('./routes/routes');


const app = express()

// firebase init
// app.use(admin.initializeApp)
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())
// express file upload
app.use(fileUpload())
// Database Connect
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/phs_portal')
  .then(() => console.log('DB Connected!'));

app.use("/api", controller) // api 

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    data: null,
    // message: "Server request failed"
    message: err.message
  })
})

module.exports = app