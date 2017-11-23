var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var mysql = require('mysql');
var async = require('async');



//Get a list of all packages on the database
function getAllPackages(pool, callback) {
	try{
		pool.getConnection(function(err, connection) {
			if (err) {
				throw err;
			}
			else {
				connection.query("SELECT * FROM package", function(err, res) {
					connection.release();
					if(err) throw err;
					return callback(res);
				});
			}
		});
	}
	catch(e) {
		console.log(e);
	}
}


//Get a list of questions Ids by using the package id
function getAllQuestionsIdByPackageId(pool, id, callback) {
	try{
		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			else {
				connection.query("SELECT * FROM package_question_list WHERE idpackage_question_list = " + mysql.escape(id), function(err, res) {
					connection.release();
					if(err) throw err;
					return callback(res);
				});
			}
		});
	}
	catch(e) {
		console.log(e);
	}
}



//Get all the questions associated to a list of ids
function getAllQuestionsById(pool, ids, callback) {
	var questions = [];
	var iterations = ids.length;

	for (id in ids) {
		try{
			pool.getConnection(function(err, connection) {
			if (err){
				throw err;
			}
			else {
				connection.query("SELECT * FROM question WHERE idquestion = " + mysql.escape(ids[id].QuestionID) + " LIMIT 1", function(err, res) {
					connection.release();
					if (err) throw err;
					questions.push(res[0]);
					if(0 === --iterations) {
						callback(questions);
					}
				});
			}

		});
			
		}
		catch(e){
			console.log(e);
		}
	}
}




//Connection pool
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





app.get('/getAllQuestionsByPackageId/:packageId', function(req, res) {
	if (res) {
		getAllQuestionsIdByPackageId(pool, req.params.packageId, function(q) {
			getAllQuestionsById(pool, q, function(questions){
				res.send(questions);
			});
		});
	}
});


app.get('/getAllPackages', function(req, res) {
	if(res) {
		getAllPackages(pool, function(packages) {
			res.send(packages);
		});
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