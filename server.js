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

/*******************************************************************/
/*					  Get a list of all domains 	               */
/*													      		   */
/*	@Param pool       : the database  							   */
/*	@Param callback   : the array containing all the associations  */
/***************************** *************************************/
function getAllDomains(pool, callback)
{
	try{
		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			else {
				connection.query("SELECT * FROM domaine", function(err, res) {
					connection.release();
					if(err) throw err;
					console.log("getAllDomains : ", res);
					return callback(res);
				});
			}
		});
	}
	catch(e) {
		console.log(e);
	}
}


/*******************************************************************/
/*					  Get a list of all domains 	               */
/*													      		   */
/*	@Param pool       : the database  							   */
/*  @Param domainId   : the domain ID                              */
/*	@Param callback   : the array containing all the associations  */
/***************************** *************************************/
function getAllDomainsQuestions(pool, domainId, callback)
{
	var domainsAndQuestions = {
		domains: [],
		questions: []
	};
	async.forEach(domainId, function(data, cb) {
		try{
			pool.getConnection(function(err, connection) {
				if(err) {
					throw err;
				}
				else {
					console.log ("domaine: ", data.iddomaine);
					connection.query("SELECT * FROM question where DomaineId = " + mysql.escape(data.iddomaine), function(err, res) {
						connection.release();
						if (err) cb(err);
						else{

						//console.log(res);
							domainsAndQuestions.domains.push(data);
							domainsAndQuestions.questions.push(res);
							cb();
						}
					});
				}
			});
		}
		catch(e) {
			console.log(e);
		}
	}, function(err, res){
		if(err) {
			throw err;
		}
		else {

			/* Sorts the final array by the domainId and by the number the question should appear in the list (ascending order) */
			domainsAndQuestions.questions.sort(function(a, b)
			{
				if (a.DomaineID == b.DomaineID) return a.Numero - b.Numero;	// Same domain
				else if (a.DomaineID < b.DomaineID) return a.DomaineID;		// Different domain
				else return b.DomaineID;									// Different domain
			});

			/* Sorts the final array by the domainId (ascending order) */
			domainsAndQuestions.domains.sort(function(a, b)
			{
				return a.domainId - b.domainId;									// Different domain
			});

			//console.log("question , ", questions);
			console.log("domains: ", domainsAndQuestions.domains);
			console.log("questions: ", domainsAndQuestions.questions);
			callback(domainsAndQuestions);
		}
	});
}


//Get a list of questions Ids by using the package id
function getAllQuestionsIdByPackageId(pool, id, callback) {
	try{
		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			else {
				connection.query("SELECT * FROM package_question_list WHERE PackageID = " + mysql.escape(id), function(err, res) {
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

			/* Sorts the final array by the domainId and by the number the question should appear in the list (ascending order) */
			questions.sort(function(a, b)
			{
				if (a.DomaineID == b.DomaineID) return a.Numero - b.Numero;	// Same domain
				else if (a.DomaineID < b.DomaineID) return a.DomaineID;		// Different domain
				else return b.DomaineID;									// Different domain
			});
			//console.log("question , ", questions);
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
				connection.query("SELECT Nom FROM domaine WHERE iddomaine = " + mysql.escape(id), function(err, res) {
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


/**************************************************************************************/
/*						Associate question to their domain name 	                  */
/*																		      		  */
/*	@Param pool       : the database  												  */
/*	@Param questions  : all the questions that need to be associated to their domain  */
/*	@Param callback   : the array containing all the associations					  */
/**************************************************************************************/
function associateQuestionsToDomainName (pool, questions, callback) {
	var domains = [];
	
	/* Retreives the domain name corresponding to the domainID of each question */
	async.forEach(questions, function(data, cb) {
			var obj = {
				domainId: data.DomaineID,	// The domain ID
				domainName: "domaine",		// The domain name
				questions: [data]			// The question associated to this domain
			};

			getAssociatedDomainName(pool, data.DomaineID, function(dom) // Retreives the correct domain name and push the result to the array
			{
				obj.domainName = dom[0].Nom;
				domains.push(obj);
				cb();
			});
	}, function(err, res){
		if(err) {
			throw err;
		}
		else {
			var sortedDomains = [];	// The final domain array that regroups every question which belongs to the same domain
			
			for(var i = 0; i < domains.length; i++)
			{
				/* Checks if the domain ID is already present in the sorted array */
				if (sortedDomains.filter(e => e.domainId == domains[i].domainId).length == 0) 
				{ // It doesn't exist yet so we add it
					var obj2 = {
						domainId: domains[i].domainId,
						domainName: domains[i].domainName,
						questions: domains[i].questions
					};
					sortedDomains.push(obj2);
				}
				else 
				{ // It does exist so we just add the question to the corresponding index of the array
					var k = 0;

					// Search for the corresponding index
					while(k < sortedDomains.length)
					{
						if(domains[i].domainId == sortedDomains[k].domainId)
						{ // We found it, let's add the question
							sortedDomains[k].questions.push(domains[i].questions[0]);
							break;
						}
						k++;
					}
				}
			}
			
			/* Sorts the final array by the domainId (ascending order) */
			sortedDomains.sort(function(a, b)
			{
				return a.domainId - b.domainId;
			});
			//console.log ("sortedDomains : ", sortedDomains);
			callback(sortedDomains);
		}
	});
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
						{type: "radio", value: 1, text:"1", id: 1},
						{type: "radio", value: 2, text:"2", id: 2},
						{type: "radio", value: 3, text:"3", id: 3},
						{type: "radio", value: 4, text:"4", id: 4},
						{type: "radio", value: 5, text:"5", id: 5},
						{type: "radio", value: 6, text:"Don't know", id: "6", checked: true, default: true},
						{type: "radio", value: 7, text:"Not concerned", id: 7},
					],
					rows:[]
				}
			]};
		for(var j=0; j<domains[i].questions.length; j++) {
			//console.log(domains[i].questions[j]);
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
		associateQuestionsToDomainName(pool, questions, function(sortedQuestions) {
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

app.get('/Icones/:icon', function(req, res) {
	res.sendFile(__dirname + '/Public/Icones/' + req.params.icon);
}); 

app.get('/getDomains', function(req, res)
{
	if(res)
	{
		getAllDomains(pool, function (domains)
		{
			getAllDomainsQuestions(pool, domains, function (domainsAndQuestions)
			{
				res.send (domainsAndQuestions);
			});
			//res.send (domains);
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

app.get('/dbManager.js', function(req, res) {
	res.sendFile(__dirname + '/Public/dbManager.js');
});

app.get('/node_modules/w2ui/w2ui-1.4.3.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/w2ui/w2ui-1.4.3.js');
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

app.get('/managedatabase.htm', function(req, res) {
	res.sendFile(__dirname + '/Public/managedatabase.htm');
});

app.get('/node_modules/chart.js/dist/Chart.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/chart.js/dist/Chart.js');
});



app.listen(8080);
console.log("App listening on port 8080.");