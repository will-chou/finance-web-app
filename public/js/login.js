$("#loginButton").on('click', function(){

	var username = $("#loginUsername").val();
	var password = $("#loginPassword").val();

	$.ajax({
        url : "/mongo/login",
        type: "POST",
        data: JSON.stringify({
        	username: username,
        	password: password
        }),
        contentType: "application/json; charset=utf-8",
        success    : function(results){
            console.log("success", results);

            ///////////////////////////////////
            //		DO SOME SHIT AFTER login //
            ///////////////////////////////////

            // ENTER DASHBOARD --->

        	$.ajax({
		        url : "/mongo/dashboard",
		        type: "POST",
		        contentType: "application/json; charset=utf-8",
		        success    : function(results){
		            console.log("success", results);

		            ///////////////////////////////////
		            //		DO SOME SHIT AFTER login //
		            ///////////////////////////////////

		            
		            // TO DO ::
		            //1. display delta (change) from stock price from day start of ALL stocks on users watchlist. 

		        },
		        error: function(err){
		        	console.log("error", err);
		        }
		    });
        },
        error: function(err){
        	console.log("error", err);
        }
    });


})


$("#registerButton").on('click', function(){

	var username = $("#registerUsername").val();
	var password = $("#registerPassword").val();
	var email = $("#registerEmail").val();

	$.ajax({
        url : "/mongo/register",
        type: "POST",
        data: JSON.stringify({
        	username: username,
        	password: password,
        	email: email
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success    : function(result){
            console.log("success", result);
        },
        error	: function(err){
        	console.log(err)
        }
    });

})