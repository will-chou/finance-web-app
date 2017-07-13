var express = require('express');
var router = express.Router();
// var User = require('../lib/User');
var mongoose = require('mongoose');

//database connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:/test');

//Schema and Model
var mySchema = mongoose.Schema({
	username: String,
	password: String,
	symbols: Array
})

var UserModel = mongoose.model('users', mySchema);

// GET HOME PAGE

// router.get('/', function(req,res,next)){
// 	res.render('index', {title: 'Express'});
// }

router.post('/register', function(req,res){
	console.log(req)
	var username = req.query.username;
	var password = req.query.password;
	// var firstname = req.body.firstname;
	// var lastname = req.body.lastname;

	var newuser = new UserModel();
	newuser.username = username;
	newuser.password = password;
	newuser.symbols = [];
	// newuser.firstname = firstname;
	// newuser.lastname = lastname;


	console.log(username + ' ' + password)
	//saving the user to the database
	newuser.save(function(err, savedUser){
		if(err){
			//to deal with the asynchronous nature of the function
			console.log(err);
			return res.status(500).send();
		}else{
			return res.send(newuser);
		}
	})
})

/////////////////////////////////////////////////////////////////////
// will update based on user id ==> updated data goes as json BODY //

router.put('/update/:id', function(req,res){
	var id = req.params.id;

	UserModel.findOne({_id: id}, function(err, foundObject){
		if(err){
			console.log(err);
			res.status(500).send();
		}else{
			if(!foundObject){
				res.status(404).send();
			}else{
				if(req.body.symbol){
					//console.log(req.body.symbol);
					foundObject.symbols.push(req.body.symbol);
				}

				if(req.body.username){
					foundObject.username = req.body.username;
				}

				foundObject.save(function(err, updatedObject){
					if(err){
						console.log(err);
						res.status(500).send();
					}else{
						res.send(updatedObject);
					}
				})
			}
		}
	})

})

/////////////////////////////////////////////////
//will give a return of all the users in the DB//

router.get('/check',function(req,res){
	var logvalue = req.headers['log'];
	if(logvalue && logvalue == 'info'){
		conosle.log("request received for /check");
	}

	var select = req.query.select;

	UserModel.find({}, function(err, foundData){
		if(err){
			console.log(err);
			res.status(500).send();
		}else{
			var responseObject;
			if(foundData.length == 0){
				responseObject = undefined;
				if(select && select == 'count'){
					responseObject = {count: 0};
				}
				res.status(404).send(responseObject);
			}else{
				var responseObject = foundData;
				if(select && select == 'count'){
					responseObject = {count: foundData.length};
				}
			}
			res.send(responseObject);
		}
	})
})

//////////////////////////////
// delete a user in the DB  //

router.delete('/delete/:id', function(req,res){
	var id = req.params.id;
	UserModel.findOneAndRemove({_id: id}, function(err){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		return res.status(200).send();
	})
})

module.exports = router;