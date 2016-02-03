'use strict';

var express = require('express');
var morgan = require('morgan'); // url loggings
var bodyParser = require('body-parser');
var session = require('express-session');
//NoSQL DB that allows key-value pairs
var RedisStore = require('connect-redis')(session); //Allows us to talk to DB and store session info
var passport = require('passport'); //General auth framework meaning it takes care of basic auth but allows for strategies
var GitHubStrategy = require('passport-github').Strategy; //References strategy object from github

var ghConfig = require('./secret/oauth-github.json');
ghConfig.callbackURL = 'http://localhost:8080/signin/github/callback';

var ghStrategy = new GitHubStrategy(ghConfig, 
	function(accessToekn, refreshToken, profile, done) {
		console.log('Authentication Successful!');
		console.dir(profile);
		//Passing all of the data of the profile
		done(null, profile);
	});

var cookieSigSecret = process.env.COOKIE_SIG_SECRET; //Looks for env variable named cookieSigSecret
if(!cookieSigSecret) {
	console.error('Please set COOKIE_SIG_SECRET');
	process.exit(1);
}

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
	secret: cookieSigSecret,
	resave: false,
	saveUninitialized: false,
	store: new RedisStore()
}));

passport.use(ghStrategy); //Tells passport that we want to use this strategy

//Before it write the user back to store, this determines what information gets stored
//Gets called once after successful authentication
passport.serializeUser(function(user, done) {
	done(null, user); //Serializes entire user
});

//Gets called during every session
passport.deserializeUser(function(user, done) {
	done(null, user); //Does the opposite
});

app.use(passport.initialize());
app.use(passport.session());

//function returning (middleware) function
app.get('/signin/github', passport.authenticate('github'));
app.get('/signin/github/callback', passport.authenticate('github'), 
	function(req, res) {
		res.redirect('/secure.html');
	});
	
app.get('/signout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.use(express.static(__dirname + '/static/public'));

app.use(function(req, res, next) {
	//req.isAuthenticated()
	next();
});

//Won't get called if the above function doesn't call next()
app.use(express.static(__dirname + '/static/secure'));

//Only allow authenticated users
app.get('/api/v1/users/me', function(req, res) {
	//Currently authenticated user: req.user
	//Full JS object that has all of the user's information
	res.json(req.user);
});

app.listen(80, function() {
	console.log('server is listening');
});