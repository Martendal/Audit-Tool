var express = require('express');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'AuditTool'
});

connection.connect(function(err) {
	if(!err) {
		console.log('Connected to database');
	}
	else {
		console.log('Error while connecting the database : \n', err);
	}
});
connection.end();



app.get('/', function(req, res) {
	res.status(200).send('Bienvenue sur l\'accueil !');
	connection.query('SELECT * from <table>',
	function(err, rows, fields) {
		if (!err) {
			console.log('The solution is: ', rows);
		}
		else {
			console.log('Error');
		}
	});
});

//Page not found
app.use(function(req, res, next) {
	res.status(404).send('Page not found!');
});

app.listen(8080);