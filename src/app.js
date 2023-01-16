const express = require('express');
const dotenv = require('dotenv');

const app = express()


// app.use(()=>console.log('app is running'))
app.get("/api", (req, res) => {
    res.send('hello world')
})

module.exports = app