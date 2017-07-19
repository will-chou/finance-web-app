
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
            console.log("success", results);

            ///////////////////////////////////
            //		DO SOME SHIT AFTER login //
            ///////////////////////////////////

            // ENTER DASHBOARD --->

            window.location.href = 'mongo/home';

            //$(window).on("load", function() {
	      //   	$.ajax({
			    //     url : "/mongo/dashboard",
			    //     type: "GET",
			    //     contentType: "application/json; charset=utf-8",
			    //     success    : function(results){
			    //         console.log("success", results);

			    //         ///////////////////////////////////
			    //         //	DO SOME SHIT AFTER login 	 //
			    //         ///////////////////////////////////


			    //         // TO DO ::
			    //         //1. display delta (change) from stock price from day start of ALL stocks on users watchlist. 

	      //            	var mountpoint = document.getElementById('mountpoint');

			    //       	console.log(results);

			    //       	//for each SYMBOL in our array, find the data.
			    //       	results.forEach(function(symbol){
			    //       		$.ajax({
			    //       			url: "/current?symbol=" + symbol,
			    //       			//type: "GET",
			    //       			dataType: 'json',
			    //       			//contentType: "application/json; charset=utf-8",
			    //       			success: function(results){
			    //       				console.log(results);
					  //         		var StockObject = results['Realtime Global Securities Quote'];
							//         console.log(StockObject);
							//         var StockName = StockObject['01. Symbol'];
							//         var StockPrice = StockObject['03. Latest Price'];
							//         var StockPriceChange = StockObject['08. Price Change'];
							//         var StockPriceChangePercent = StockObject['09. Price Change Percentage'];


							// 		console.log(StockPrice);
							// 		console.log(StockPriceChange);
							// 		console.log(StockPriceChangePercent);


							// 		var infoBox = document.createElement('div');
							// 		var textName = document.createElement('p');
							// 		var textPrice = document.createElement('p');
							// 		var textPriceChange = document.createElement('p');
							// 		var textPriceChangePercent = document.createElement('p');

							// 		textName.innerHTML = "Name: " + StockName;
							// 		textPrice.innerHTML = "Current Price: $" + StockPrice;
							// 		textPriceChange.innerHTML = "Price Change Since Day Start: $" + StockPriceChange;
							// 		textPriceChangePercent.innerHTML = "Price Change Percent: " + StockPriceChangePercent;

							// 		infoBox.appendChild(textName);
							// 		infoBox.appendChild(textPrice);
							// 		infoBox.appendChild(textPriceChange);
							// 		infoBox.appendChild(textPriceChangePercent);

							// 		mountpoint.appendChild(infoBox);

			    //       			},
			    //       			error: function(err) {
			    //       				console.log("error", err);
			    //       			}
			    //       		})
			    //       	})
		


			    //     },
			    //     error: function(err){
			    //     	console.log("error", err);
			    //     }
			    // });
			
			//});




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