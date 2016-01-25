'use strict';

var mysql = require('mysql');
var bluebird = require('bluebird');

//load connection info
var dbConfig = require('./secret/config-maria.json');

//creates a connection to the database
var conn = bluebird.promisifyAll(mysql.createConnection(dbConfig));

//id of newly inserted row
var id;

function logRow(row) {
	console.log(row);
}


function logRows(rows) {
	rows.forEach(logRow);	
}

conn.queryAsync('insert into stories (url) values (?)', ['http://google.com']) //insert info table
			.then(function(results) {
				console.log('row inserted, new id = %s', results.insertId) //log the new row inserted, showing id
				id = results.insertId; // store the newly created id
				return conn.queryAsync('select * from stories where id=?', [results.insertId]); // returns a query for the id
			})
			.then(logRows)// console.log rows
			.then(function() {
				return conn.queryAsync('update stories set votes=votes+1 where id=?', [id]); // updates stories
			})
			.then(function(results) {
				console.log('%d rows affected', results.affectedRows); // log the rows affected
				return conn.queryAsync('select * from stories where id=?', [id]); // select all where id = ?
			})
			.then(logRows) // console.log rows
			.then(function() {
				return conn.queryAsync('delete from stories where id=?', [id]); //delete from stories where id =?
			})
			.then(function(result) {
				console.log('%d rows affected', result.affectedRows); // console.log the result
			})
			.then(function() {
				conn.end(); // end connection
			})
			.catch(function(err) {
				console.error(err); // catch error
				conn.end(); // end connection
			});

	
	/* Without promises:
	conn.query('select * from stories', function(err, rows) {
	if(err) {
		console.error(err);
	} else {
		console.log('%d rows returned', rows.length);
		
		rows.forEach(function(row) {
			console.log(row);
		});
	}
	conn.end();
});
*/