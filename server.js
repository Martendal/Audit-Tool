var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var mysql = require('mysql');



function getAllQuestionsByDomainID(pool, id, callback) {
	try{
		pool.getConnection(function(err, connection) {
			if (err){
				throw err;
			}
			else {
				connection.query("SELECT * FROM question WHERE DomaineID = " + mysql.escape(id), function(err, res) {
					connection.release();
					if (err) throw err;
					return callback(res);
				});
			}
		});

	}
	catch(e) {
		console.log(e);
	}
	
}





var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'audit',
	connectionLimit: 10
});




app.use(express.static(__dirname + '../Public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());




app.get('/test', function(req, res) {
	if(res) {
		res.send(req);
	}
});

app.get('/QuestionsByDomain/:domainId', function(req, res) {
	if (res) {
		getAllQuestionsByDomainID(pool, req.params.domainId, function(q) {
			res.send(q);
		});
		//res.send(getAllQuestionsByDomainID(connection, req.params.domainId));
	}
});



app.get('/', function(req, res) {
	res.sendFile(__dirname + '/Public/index.html');
	//res.sendFile(__dirname + '/Public/core.js');
});

app.get('/core.js', function(req, res) {
	res.sendFile(__dirname + '/Public/core.js');
});

app.get('/dashboard.css', function(req, res) {
	res.sendFile(__dirname + '/Public/dashboard.css');
});

app.listen(8080);
console.log("App listening on port 8080.");