
module.exports = function() {
	var url = require('url');
	var express = require('express');
	var bodyParser = require('body-parser');
	var config = require('./config.json');
	var app = express();




	//set view engine to ejs
	app.set('view engine', 'ejs');
	app.get('/', function(req, res){
	    res.render('index');
	});

	app.use(express.static(__dirname + '/public'));


	// Parse JSON body and store result in req.body
	app.use(bodyParser.json());

	//test output


	app.listen(config.port, function() {
		console.log("Listening on port " + config.port);
	});

}
