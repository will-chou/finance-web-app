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

        },
        error: function(err){
        	console.log("error", err);
        }
    });

    console.log("finish");

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