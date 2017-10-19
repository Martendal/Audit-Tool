var express = require('express');
var mongoose = require('mongoose');//require('mongodb').MongoClient;
mongoose.Promise = require('bluebird');
//assert.equal(query.exec().constructor, require('bluebird'));
var app = express();
var url = 'mongodb://localhost:27017/auditTool';


var promise = mongoose.createConnection(url, {
	useMongoClient: true
});
promise.then(function(db) {
	//Using db here
	console.log('Connected');
});




app.get('/', function(req, res) {
	res.status(200).send('Bienvenue sur l\'accueil !');
});

//Page not found
app.use(function(req, res, next) {
	res.status(404).send('Page not found!');
});

app.listen(8080);