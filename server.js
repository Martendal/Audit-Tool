var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var mysql = require('mysql');
var async = require('async');
var jquery = require('jquery');



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
					//console.log("getall : ", res);
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
	async.forEach(ids, function(data, cb) {
		try{
			pool.getConnection(function(err, connection) {
			if (err){
				cb(err);
			}
			else {
				//console.log("id : ", ids[id].QuestionID);
				connection.query("SELECT * FROM question WHERE idquestion = " + mysql.escape(data.QuestionID) + " LIMIT 1", function(err, res) {
					connection.release();
					if (err) cb(err);
					//console.log(res[0]);
					else{
						questions.push(res[0]);
						cb();
					}
				});
			}

		});
			
		}
		catch(e){
			console.log(e);
		}
	}, function(err, res){
		if(err) {
			throw err;
		}
		else {
			callback(questions)
		}
	});
}


//Get domain name by id
function getAssociatedDomainName(pool, id, callback) {
	try{
		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			else {
				connection.query("SELECT * FROM domaine WHERE iddomaine = " + mysql.escape(id), function(err, res) {
					connection.release();
					if(err) throw err;
					//console.log("getall : ", res);
					/*return */callback(res);
				});
			}
		});
	}
	catch(e) {
		console.log(e);
	}
}


function sortQuestionsByDomain (pool, questions, callback) {
	var domains = [];
	for(var i = 0; i<questions.length; i++) {
		if(domains.filter(e => e.domainId == questions[i].DomaineID).length == 0) {
			//console.log("domaine : ",getDomainNameById($http, questions[i].DomaineID));
			var obj = {
				domainId: questions[i].DomaineID,
				domainName: "domaine",//getDomainNameById($http, questions[i].DomaineID),
				questions: [questions[i]]
			};
			/*getAssociatedDomainName(pool, questions[i].DomaineID, function(dom) {
				obj.domainName = dom;
				domains.push(obj);
			});*/
			domains.push(obj);
			
		}
		else{
			/*var dom = jquery.grep(domains, function(e) { return e.domainId == questions[i].DomaineID});
			if(dom.length == 1) {
				dom[0].questions.push(questions[i]);
			}*/
			var k=0;
			while(k < domains.length) {
				if(domains[k].domainId == questions[i].DomaineID) {
					domains[k].questions.push(questions[i]);
					break;
				}
				k++;
			}

		}
	}
	callback(domains);
}


function transformIntoSurvey(domains) {
	var json = {pages:[]};

	//console.log(domains);
	for(var i=0; i<domains.length; i++) {
		var questions = {
			questions: [
				{
					type:"matrix",
					name:domains[i].domainName+i,
					title: domains[i].domainName,
					columns: [
						{value: 1, text:"1"},
						{value: 2, text:"2"},
						{value: 3, text:"3"},
						{value: 4, text:"4"},
						{value: 5, text:"5"},
						{value: 6, text:"Don't know"},
						{value: 7, text:"Not concerned"},
					],
					rows:[]
				}
			]};
		for(var j=0; j<domains[i].questions.length; j++) {
			console.log(domains[i].questions[j]);
			questions.questions[0].rows.push({value: domains[i].questions[j].idquestion, text: domains[i].questions[j].Question})
		}
		//console.log(questions);
		//console.log(questions.questions[0]);
		json.pages.push(questions);

	}
	//console.log(json.pages[0].questions[0]);
	//console.log(json);
	return json;
}


function createSurveyFromQuestions(pool, questions, callback) {
	try{
		//console.log("questions: ", questions);
		sortQuestionsByDomain(pool, questions, function(sortedQuestions) {
			//console.log("sortedquestions: ", sortedQuestions);
			callback(transformIntoSurvey(sortedQuestions));
		});
	}
	catch(e) {
		console.log(e);
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
				console.log(questions);
				res.send(questions);
			});
		});
	}
});

app.get('/getAssociatedDomainName/:domainId', function(req,res) {
	if(res) {
		getAssociatedDomainName(pool, req.params.domainId, function(dom) {
			console.log(dom[0].Nom);
			res.send(dom[0].Nom);
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

app.get('/getPackage/:packageId', function(req, res) {
	if(res) {
		//console.log(req.params.packageId);
		getAllQuestionsIdByPackageId(pool, req.params.packageId, function(q) {
			getAllQuestionsById(pool, q, function(questions){
				createSurveyFromQuestions(pool, questions, function(survey) {
					//console.log(survey);
					res.send(survey);
				});
			});
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

app.get('/newAudit.htm', function(req, res) {
	res.sendFile(__dirname + '/Public/newAudit.htm');
});

app.get('/savedAudit.htm', function(req, res) {
	res.sendFile(__dirname + '/Public/savedAudit.htm');
});

app.get('/import.htm', function(req, res) {
	res.sendFile(__dirname + '/Public/import.htm');
}); 

app.get('/parameters.htm', function(req, res) {
	res.sendFile(__dirname + '/Public/parameters.htm');
});

app.get('/node_modules/chart.js/dist/Chart.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/chart.js/dist/Chart.js');
});

app.listen(8080);
console.log("App listening on port 8080.");