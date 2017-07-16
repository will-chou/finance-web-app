var express = require('express');
var router = express.Router(); 
var User = require('../lib/Users');		//schema located here
var mongoose = require('mongoose');

//database connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:/test');

			//////////////////////////////
			//////////////////////////////
			//    DB NAME    : myusers  //
			//////////////////////////////
			//////////////////////////////



// GET HOME PAGE
router.get('/', function(req,res,next){
	res.render('index', {title: 'Express'});
})


//register a user

router.post('/register', function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	// var firstname = req.body.firstname;
	// var lastname = req.body.lastname;
	var email = req.body.email;		//must be in actual email form

	var newuser = new User();
	newuser.username = username;
	newuser.password = password;
	newuser.symbols = [];		//init empty array
	// newuser.firstname = firstname;
	// newuser.lastname = lastname;
	newuser.email = email;


	//saving the user to the database
	newuser.save(function(err, savedUser){
		if(err){
			//to deal with the asynchronous nature of the function
			console.log(err);
			return res.status(500).send();
		}else{
			return res.status(200).send(newuser);
		}
	})
})


//login

router.post('/login', function(req,res){
	console.log("enter login");
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username: username}, function(err, user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(!user){
			return res.status(404).send();
		}

		//check if passwords are the same
		user.comparePassword(password, function(err, isMatch){
			if(isMatch && isMatch == true){
				//if user is found!
				//sets logged in user to the user of the session so it can be verified in /dashboard
				req.session.user = user;
				return res.status(200).send();
			}else{
				return res.status(401).send();
			}
		})

	})
})



//start a session
router.get('/dashboard', function(req,res){
	
	if(!req.session.user){
		return res.status(401).send();
	}
	var user = req.session.user;

	//return the user's symbol array
	return res.status(200).send(user.symbols);
})


//destroy a session
router.get('/logout', function(req,res){
	req.session.destroy();
	return res.status(200).send();
})



////////////////////////////////////////////////////////////////////////////////////////////
// will update based on session.user (express-session) ==> updated data goes as json BODY //

router.put('/update/:symbol', function(req,res){
	var user = req.session.user;


	//user the user ID to find the user in our DB and then append the symbol to their symbol array
	User.findOne({_id: user._id}, function(err, foundObject){
		if(err){
			res.status(500).send();
		}else{
			if(!foundObject){
				res.status(404).send();
			}else{
				//UTILIZED FOR UPDATING THE SYMBOLS A USER IS LINKED TO
				if(req.params.symbol){
					//console.log(req.body.symbol);
					foundObject.symbols.push(req.params.symbol);
				}

				foundObject.save(function(err, updatedObject){
					if(err){
						res.status(500).send();
					}else{
						res.send(updatedObject);
					}
				})
			}
		}
	})
})



//////////////////////////////
// delete a user in the DB  //

router.delete('/delete/:id', function(req,res){
	var id = req.params.id;
	UserModel.findOneAndRemove({_id: id}, function(err){
		if(err){
			return res.status(500).send();
		}

		return res.status(200).send();
	})
})

module.exports = router;