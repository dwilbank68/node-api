var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs');

var dogs = require('./routes/dog_routes.js')(app);

var server = app.listen(3001, function(){
    console.log('Server at localhost:3001');
});

