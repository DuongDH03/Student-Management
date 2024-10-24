const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const mongoose = require("mongoose")
require('dotenv').config();

const port = 3001;
const app = express();

app.use(cors());

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.use('/api', api);

// Connecting to database
const uri = process.env.MONGODB_URI;

//configure mongoose
mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log('MongoDB connection error:', err.message));

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});