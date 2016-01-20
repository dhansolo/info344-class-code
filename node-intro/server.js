'use strict';

//require the express module
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//create a new express app
var app = express();

//log requests
app.use(morgan('dev'));
//parse JSON post bodies
app.use(bodyParser.json());

//server static files from /static
app.use(express.static(__dirname + '/static'));

app.get('/api/v1/users', function(req, res) {
	var users = [
		{
			email: 'test@test.com',
			displayName: 'Test User'
		}
	];
	
	res.json(users);
});

app.post('/api/v1/users', function(req, res) {
	console.log(req.body);
	
	res.json({message: 'new user created updated'});
});

/*
app.use(function(req, res, next) {
	//log method and url
	console.log('%s %s', req.method, req.url);
	//continue processing request
	next();
});

//call this function for GET on / (root)
app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.send('Hello World!');
});


//call this function for GET on /time
app.get('/time', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.send(new Date());
});
*/


//listen for HTTP request on port 80
app.listen(80, function() {
	console.log('server is listening');
});


