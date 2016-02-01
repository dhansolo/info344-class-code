'use strict';

var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt'));

var password = process.argv[2];
var rounds = 10;

if(process.argv.length >= 4) { //If there is a password, it is in position 4
	rounds = parseInt(process.argv[3]); //Get the rounds at position 3
	if(isNaN(rounds)) { //If it is not a number
		console.error('number of rounds must be an integer!');
		process.exit(1);
	}
}

console.log("hashing '%s' with %d rounds of bcrypt...", password, rounds);
console.time('duration');

bcrypt.hashAsync(password, rounds)
	.then(function(hash) {
		console.timeEnd('duration');
		console.log(hash);
		
		return[hash, bcrypt.compareAsync(password, hash)];
	})
	.spread(function(hash, isSame) {
		console.log("comparing hash against '%s': %j", password, isSame);
		password += 'x';
		return [hash, bcrypt.compareAsync(password, hash)];
	})
	.spread(function(hash, isSame) {
		console.log("comparing hash against '%s': %j", password, isSame);
	})
	.catch(function(err) {
		console.error(err);
		process.exit(1);
	})