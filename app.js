var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.json');
var app = express();
var alphavantageRoute = require('./routes/alphavantage');
var dbRoute = require('./routes/index');




//set view engine to ejs
app.set('view engine', 'ejs');
app.get('/',function(req, res, next){
    res.render('index');
});


app.use(express.static(__dirname + '/public'));


// Parse JSON body and store result in req.body
app.use(bodyParser.json());

app.use(function (req, res, next){ //configure for cross origin headers
	console.log("URL requested : " + req.url);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});


app.listen(config.port, function() {
	console.log("Listening on port " + config.port);
});



//routing
app.use('/sector', alphavantageRoute.getSectorData);
app.use('/historical', alphavantageRoute.getHistoricalData);
app.use('/current', alphavantageRoute.getCurrentData);


// app.post('/register', dbRoute);	//register user
// app.get('/checkdb', dbRoute);		//check for user info
// app.put('/update', dbRoute);
app.use('/mongo', dbRoute);