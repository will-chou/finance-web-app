var request = require('request');

'use strict'



module.exports.getSectorData = function(req,res){
  var urlSector = "http://www.alphavantage.co/query?function=SECTOR&apikey=TH8FUMSI7QU19B39";
  request({
		method: 'GET',
		url: urlSector,
		headers: {'content-type': 'json'}
	}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {

          ///////////
          // TO DO //
          ///////////
          
          //do shit with data

			res.send(response.body);
	    }else{
	    	console.log('error');
	    }
	})	

}

module.exports.getHistoricalData = function(req,res){
  	var urlHistorical = "http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + req.query.symbol + "&outputsize=full&apikey=TH8FUMSI7QU19B39";
  	request({
		method: 'GET',
		url: urlHistorical,
		headers: {'content-type': 'json'}
	}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {

          ///////////
          // TO DO //
          ///////////
          

          //important logic
          //THIS IS A FUCKKKKK TON OF DATA. DO SOMETHING WITH IT BEFORE YOU RETURN

			res.send(response.body);
	    }else{
	    	console.log('error');
	    }
	})	

}


module.exports.getCurrentData = function(req,res){
  	var url = "http://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + req.query.symbol + "&apikey=TH8FUMSI7QU19B39";
  	request({
		method: 'GET',
		url: url,
		headers: {'content-type': 'json'}
	}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {

			res.send(response.body);
	    }else{
	    	console.log('error');
	    }
	})	

}