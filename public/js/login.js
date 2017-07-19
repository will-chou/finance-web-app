//////////////////////////////////////
//		CODE FOR POPUP LOGIN  ////////
//////////////////////////////////////

// Get the modal
var modal = document.getElementById('myModal');
var registerModal = document.getElementById('registerModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var registerBtn = document.getElementById("registerBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var regSpan = document.getElementsByClassName("closeReg")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}
registerBtn.onclick = function(){
    registerModal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
regSpan.onclick = function(){
  registerModal.style.display = "none";

}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == registerModal) {
      registerModal.style.display = "none"
    }    
  }







$("#loginButton").on('click', function(){
	modal.style.display = "none";
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


            //redirect to homepage
            window.location.href = 'mongo/home';


        },
        error: function(err){
        	console.log("error", err);
        }
    });


})


$("#registerButton").on('click', function(){
	registerModal.style.display = "none";


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
