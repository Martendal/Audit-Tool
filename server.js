var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
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

//console.log(__dirname);

app.use(express.static(__dirname + '../Public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


/*app.get('/', function(req, res) {
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
});*/

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/Public/index.html');
});

app.get('/test', function(req, res) {
	if(err) {
		res.send(err);
	}
	else {
		res.send(req);
	}
});

//Page not found
app.use(function(req, res, next) {
	res.status(404).send('Page not found!');
});

app.listen(8080);
console.log("App listening on port 8080.");