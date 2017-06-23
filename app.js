
	var url = require('url');
	var express = require('express');
	var bodyParser = require('body-parser');
	var config = require('./config.json');
	// var cors = require('cors');

	var app = express();


	//set view engine to ejs
	app.set('view engine', 'ejs');
	app.get('/',function(req, res, next){
	    res.render('index');
	});



// COULD BE COMPLETELY USELESS
	// app.use(cors());
	// app.options('*', cors()) // include before other routes 
	// app.del('*', cors(), function (req, res, next) {
	//   res.json({msg: 'This is CORS-enabled for all origins!'})
	// })

	// app.get('*', cors(), function (req, res, next) {
	//   res.json({msg: 'This is CORS-enabled for all origins!'})
	// })




	app.use(express.static(__dirname + '/public'));


	// Parse JSON body and store result in req.body
	app.use(bodyParser.json());



// COULD BE COMPLETELY USELESS

	// app.use(function (req, res, next) {

	//     // Website you wish to allow to connect
	//     res.setHeader('Access-Control-Allow-Origin', '*');

	//     // Request methods you wish to allow
	//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	//     // Request headers you wish to allow
	//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');

	//     // Set to true if you need the website to include cookies in the requests sent
	//     // to the API (e.g. in case you use sessions)
	//     res.setHeader('Access-Control-Allow-Credentials', true);

	//     // Pass to next layer of middleware
	//     next();
	// });



	app.listen(config.port, function() {
		console.log("Listening on port " + config.port);
	});

