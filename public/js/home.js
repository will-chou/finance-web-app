var logoutBtn = document.getElementById('logoutBtn');

logoutBtn.onclick = function() {
	$.ajax({
		url: '/mongo/logout',
		type: 'GET',
		success: function(results) {
			console.log("You are now logged out.  Redirecting you back to home page");
			setTimeout(function() {
				window.location.href = '/';
			}, 1000);
		},
		error: function() {
			console.log("Logout error");
		}
	})
}

window.onload = function() {
	$.ajax({
        url : "/mongo/dashboard",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success    : function(results){
            console.log("success", results);

            ///////////////////////////////////
            //	DO SOME SHIT AFTER login 	 //
            ///////////////////////////////////


            // TO DO ::
            //1. display delta (change) from stock price from day start of ALL stocks on users watchlist. 

         	var mountpoint = document.getElementById('mountpoint');

          	console.log(results);

          	//for each SYMBOL in our array, find the data.
          	results.forEach(function(symbol){
          		$.ajax({
          			url: "/current?symbol=" + symbol,
          			//type: "GET",
          			dataType: 'json',
          			//contentType: "application/json; charset=utf-8",
          			success: function(results){
          				console.log(results);
		          		var StockObject = results['Realtime Global Securities Quote'];
				        console.log(StockObject);
				        var StockName = StockObject['01. Symbol'];
				        var StockPrice = StockObject['03. Latest Price'];
				        var StockPriceChange = StockObject['08. Price Change'];
				        var StockPriceChangePercent = StockObject['09. Price Change Percentage'];


						console.log(StockPrice);
						console.log(StockPriceChange);
						console.log(StockPriceChangePercent);


						var infoBox = document.createElement('div');
						var textName = document.createElement('p');
						var textPrice = document.createElement('p');
						var textPriceChange = document.createElement('p');
						var textPriceChangePercent = document.createElement('p');

						textName.innerHTML = "Name: " + StockName;
						textPrice.innerHTML = "Current Price: $" + StockPrice;
						textPriceChange.innerHTML = "Price Change Since Day Start: $" + StockPriceChange;
						textPriceChangePercent.innerHTML = "Price Change Percent: " + StockPriceChangePercent;

						infoBox.appendChild(textName);
						infoBox.appendChild(textPrice);
						infoBox.appendChild(textPriceChange);
						infoBox.appendChild(textPriceChangePercent);

						mountpoint.appendChild(infoBox);

          			},
          			error: function(err) {
          				console.log("error", err);
          			}
          		})
          	})



        },
        error: function(err){
        	console.log("error", err);
        }
    });

    document.getElementById('submit').addEventListener('click',
      function(){
        console.log("fetchdata about to be called");

        fetchDataCurrent();

        //close the modal
      });
    document.getElementById('hist-submit').addEventListener('click',
      function(){
        console.log("historical data gonna be grabbed");
        fetchDataHistorical();
      });
    document.getElementById('sect-submit').addEventListener('click',
      function(){
        console.log("sector data gonna be grabbed");
        fetchDataSector();
      });
}