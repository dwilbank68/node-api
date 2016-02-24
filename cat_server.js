var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');

var cats = require('./routes/cat_routes.js')(app);

var server = app.listen(3000, function(){
    console.log('Server at localhost:3000');
});

