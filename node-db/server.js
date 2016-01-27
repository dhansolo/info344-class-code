'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('./secret/config-maria.json');
var bluebird = require('bluebird');
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));


//Don't have to use file type at the end. Node will know what kind of file it is.
var storiesApi = require('./controllers/stories-api.js');
var Story = require('./models/story.js').Model(connPool);

var app = express();

//Logs in a particular format
app.use(morgan('dev'));
//Parse JSON format
app.use(bodyParser.json());
//Allows us to search for files in a particular sub-directory. Tells node to just spit out what it finds to the user.
app.use(express.static(__dirname + '/static'));
//mount the stories 
app.use('/api/v1', storiesApi.Router(Story));

app.listen(80, function(req, res) {
	console.log('server is listening...');
});

