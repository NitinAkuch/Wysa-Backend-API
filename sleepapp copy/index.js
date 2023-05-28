'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
// const morgan = require('morgan');
const apiRouter = require("./routes/index")
const db = require('./config/db');
var http = require('http');
const app = express();
// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true, optionsSuccessStatus: 200 }));
app.use(express.static(__dirname + '/public'));
app.use("/api/", apiRouter);
// Default route
app.get("/", (req, res) => {
    res.end('Wysa Sleep App is now running...');
})
app.listen(5356, () => {
    console.log('Hello Nitin, App is running on port no. 5356');
})