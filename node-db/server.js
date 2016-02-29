'use strict';

var express = require('express');
<<<<<<< HEAD
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

=======
var morgan = require('morgan');                         //logging
var bodyParser = require('body-parser');                //body parsing
var mysql = require('mysql');                           //database
var dbConfig = require('./secret/config-maria.json');   //database config
var bluebird = require('bluebird');                     //promise wrapper

//create a connection pool to the MariaDB server
//this allow multiple queries to execute against
//the database in parallel
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

//require our stories controller
var storiesApi = require('./controllers/stories-api');
//require our story model
var stories = require('./models/stories.js').Model(connPool);

//create the express application
var app = express();

//log requests
app.use(morgan('dev'));
//parse JSON in the request body
app.use(bodyParser.json());

//serve static files from the /static subdirectory
app.use(express.static(__dirname + '/static'));

//mount the stories API router under /api/v1
app.use('/api/v1', storiesApi.Router(stories));

//start listening for HTTP requests on port 80
app.listen(80, function() {
    console.log('server is listening...'); 
});
>>>>>>> 3c8515c4416a5c067735897bd2477625ce122fd5
