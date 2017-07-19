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


          //1. display delta (change) from stock price from day start of ALL stocks on users watchlist. 

          var mountpoint = document.getElementById('mountpoint');

          console.log(results);

          //for each SYMBOL in our array, find the data.
          for(var i = 0; i < results.length; i++) {
          //results.forEach(function(symbol){
          	//setTimeout(function() {
	          	var symbol = results[i];

				console.log("Symbol " + i + " is " + symbol);

	            $.ajax({
	              url: "/current?symbol=" + symbol,
	              type: "GET",
	              dataType: 'json',
	              contentType: "application/json; charset=utf-8",
	              async: false,
	              success: function(results){
	                console.log(results);
	                var StockObject = results['Realtime Global Securities Quote'];
	                console.log(StockObject);
	                var StockName = StockObject['01. Symbol'];
	                var StockPrice = StockObject['03. Latest Price'];
	                var StockPriceChange = StockObject['08. Price Change'];
	                var StockPriceChangePercent = StockObject['09. Price Change Percentage'];

	                var infoBox = document.createElement('div');
	                var textName = document.createElement('p');
	                var textPrice = document.createElement('p');
	                var textPriceChange = document.createElement('p');
	                var textPriceChangePercent = document.createElement('p');
	                var deleteButton = document.createElement('span');

	                infoBox.className = "infoBox";
	                textName.className = "stockName";
	                textPrice.className = "stockInfo";
	                textPriceChange.className = "stockInfo";
	                textPriceChangePercent.className = "stockInfo";
	                deleteButton.className = "delete";

	                textName.id = i + "_name";
	                infoBox.id = i + "_div";
	                deleteButton.id = "" + i;
	                console.log(StockName + " id is " + deleteButton.id);

	                var stockColor;
	              //change color of text
	              if(StockPriceChange < 0){
	                stockColor = "#ff6868";

	              }else{
	                stockColor = "#61ce81";
	              }

	              textName.innerHTML = StockName;
	              textPrice.innerHTML = "Current : $" + Math.round(StockPrice*100)/100;
	              textPriceChange.innerHTML = "Delta : $" + "<span style=color:"+stockColor+">"+Math.round(StockPriceChange*100)/100 + "</span>";
	              textPriceChangePercent.innerHTML = "Percent Change : " + "<span style=color:"+stockColor+">"+StockPriceChangePercent+"</span>";
	              deleteButton.innerHTML = "&times;";

	              var bar = document.createElement('div');
	              bar.className = "bar";

	              infoBox.appendChild(deleteButton);
	              infoBox.appendChild(textName);
	              infoBox.appendChild(bar);
	              infoBox.appendChild(textPrice);
	              infoBox.appendChild(textPriceChange);
	              infoBox.appendChild(textPriceChangePercent);

	              mountpoint.appendChild(infoBox);

	            }
	          })
          //}, 300*i);
		}


        },
        error: function(err){
          console.log("error", err);
        }
      });

   document.getElementById('submit').addEventListener('click',
    function(){
      console.log("fetchdata about to be called");

      fetchDataCurrent();

    });
   
    fetchDataSector();

    setTimeout(function() {
    	var numBoxes = $('div.infoBox').length;
    	console.log("numBoxes is " + numBoxes);
  //   	for(var i = 0; i < numBoxes; i++) {
  //   		//setTimeout(function() {
		// 		var deleteBtn = document.getElementById("" + i);
		// 		console.log("deleteBtn id: " + deleteBtn.id);

		// 		deleteBtn.onclick = function() {
		// 			console.log("DELETE CLICKED " + deleteBtn.id);
		// 			var infoBoxId = document.getElementById(deleteBtn.id + "_div");
		// 			console.log("infoBoxId: " + infoBoxId.id);
		// 			infoBoxId.style.display = "none";
		// 		}
		// 	//}, 100);
		// }
		var deleteId = 0;

		loadClickEvents(numBoxes, deleteId);

	}, 100);
}





//////////////////////
// HELPER FUNCTIONS //
//////////////////////




function fetchDataSector(){
  $.ajax({
      url: "/sector",
      dataType: 'json',
      success: function(results){
          console.log(results);

          ///////////
          // TO DO //
          ///////////

          //define mountpoint
          var mountpoint = document.getElementById('sector-mount')

          //analyze results
          var realTime = results["Rank A: Real-Time Performance"];

          console.log(realTime);



          // NOTE! a byproduct of doing this, is that it sorts the values an keys array
          // from greatest to largest.  Interesting functionality.
          var keys = Object.keys(realTime);
          var values = Object.values(realTime);

          // var cd = realTime["Consumer Discretionary"];
          // var cs = realTime["Consumer Staples"]
          // var e = realTime["Energy"]
          // var f = realTime["Financials"]
          // var hc = realTime["Health Care"]
          // var i = realTime["Industrials"]
          // var it = realTime["Information Technology"]
          // var me = realTime["Materials"]
          // var re = realTime["Real Estate"]
          // var ts = realTime["Telecommunication Services"]
          // var u = realTime["Utilities"]


          var length = keys.length;
          //loop through and build the front-end display
          for(var i = 0; i < length; i++){
            var sectorBox = document.createElement('div');
            var sectorName = document.createElement('p');
            var sectorDeltaContainer = document.createElement('div');
            var sectorDelta = document.createElement('p');

            //add styling
            sectorBox.className = "sectorBox";
            sectorName.className = "sectorName";
            sectorDelta.className = "sectorText";
            sectorDeltaContainer.className = "sectorTextBox";

            //add the colorful ring
            if(parseFloat(values[i]) < 0){
              sectorDeltaContainer.style.border = "3px solid #ff6868";
            }else{
              sectorDeltaContainer.style.border = "3px solid #61ce81";
            }


            sectorName.innerHTML = keys[i];
            sectorDelta.innerHTML = values[i];

            //append it all together
            sectorDeltaContainer.appendChild(sectorDelta);
            sectorBox.appendChild(sectorName);
            sectorBox.appendChild(sectorDeltaContainer);
            //append to mountpoint
            mountpoint.appendChild(sectorBox);
          }









      },
      error: function(){
          console.log("error");
      }
  });
}


function fetchDataHistorical(){
  var keyword = document.getElementsByName('hist-keyword')[0].value;
  var urlHistorical = window.location.href + "historical?symbol=" + keyword;

  $.ajax({
    url: urlHistorical,
    dataType: 'json',
    success: function(results){
      console.log(results);
          ///////////
          // TO DO //
          ///////////

          //display results
    },
    error: function(results){
      console.log("couldn't grab historical data")
    }
  });


}




function fetchDataCurrent(){
  var keyword = document.getElementsByName('keyword')[0].value;

  $.ajax({
      url:   "/current?symbol=" + keyword,
      dataType: 'json',
      async: false,
      success: function(results){
      	//don't add if invalid
      	var StockObject = results['Realtime Global Securities Quote'];
        console.log(StockObject);
        var StockName = StockObject['01. Symbol'];
        console.log("Stock name: " + StockName);

        if(!StockName) {
        	console.log("Symbol entered is not a valid symbol");
        	return;
        }

        var display = true;
        //displayGraph(keyword);
        //ADD SYMBOL TO USER'S SHIT
        $.ajax({
            url: "/mongo/update/" + keyword,
            type: "PUT",
            async: false,
            success: function(updateResults){
              console.log("updateResults: " + updateResults);
              if(updateResults === "Symbol already saved") {
                display = false;
              }
            },
            error: function(){
              console.log("error");
            }
        });

        console.log("Display boolean: " + display);

        if(display) {
        	var numBoxes = $('div.infoBox').length;
    		console.log("numBoxes is " + numBoxes);

        	console.log(results);
        	var mountpoint = document.getElementById('mountpoint');

            var StockPrice = StockObject['03. Latest Price'];
            var StockPriceChange = StockObject['08. Price Change'];
            var StockPriceChangePercent = StockObject['09. Price Change Percentage'];

            var infoBox = document.createElement('div');
            var textName = document.createElement('p');
            var textPrice = document.createElement('p');
            var textPriceChange = document.createElement('p');
            var textPriceChangePercent = document.createElement('p');
            var deleteButton = document.createElement('span');

            infoBox.className = "infoBox";
            textName.className = "stockName";
            textPrice.className = "stockInfo";
            textPriceChange.className = "stockInfo";
            textPriceChangePercent.className = "stockInfo";
            deleteButton.className = "delete";

            textName.id = numBoxes + "_name";
            infoBox.id = numBoxes + "_div";
            deleteButton.id = "" + numBoxes;
            console.log(StockName + " id is " + deleteButton.id);

            var stockColor;
          //change color of text
          if(StockPriceChange < 0){
            stockColor = "#ff6868";

          }else{
            stockColor = "#61ce81";
          }

          textName.innerHTML = StockName;
          textPrice.innerHTML = "Current : $" + Math.round(StockPrice*100)/100;
          textPriceChange.innerHTML = "Delta : $" + "<span style=color:"+stockColor+">"+Math.round(StockPriceChange*100)/100 + "</span>";
          textPriceChangePercent.innerHTML = "Percent Change : " + "<span style=color:"+stockColor+">"+StockPriceChangePercent+"</span>";
          deleteButton.innerHTML = "&times;";

          var bar = document.createElement('div');
          bar.className = "bar";

          infoBox.appendChild(deleteButton);
          infoBox.appendChild(textName);
          infoBox.appendChild(bar);
          infoBox.appendChild(textPrice);
          infoBox.appendChild(textPriceChange);
          infoBox.appendChild(textPriceChangePercent);

          mountpoint.appendChild(infoBox);
        }

      },
      error: function(){
        console.log("error");
      }
  });

    var numBoxes = $('div.infoBox').length;
	var deleteId = numBoxes - 1;

	setTimeout(loadClickEvents(numBoxes, deleteId), 300);

}

//recursive function to load the click events for the delete buttons
function loadClickEvents(numBoxes, deleteId) {
	if(deleteId >= numBoxes) {
		return;
	}

	var deleteBtn = document.getElementById("" + deleteId);
	console.log("deleteBtn id: " + deleteBtn.id);

	deleteBtn.onclick = function() {
		console.log("DELETE CLICKED " + deleteBtn.id);
		var infoBoxId = document.getElementById(deleteBtn.id + "_div");
		console.log("infoBoxId: " + infoBoxId.id);
		infoBoxId.style.display = "none";

		stockName = document.getElementById(deleteBtn.id + "_name").innerHTML;
		console.log("Deleting stock " + stockName);

		$.ajax({
			url: '/mongo/deleteSymbol',
			type: 'POST',
			data: JSON.stringify({
				stockName: stockName
			}),
			contentType: "application/json; charset=utf-8",

			success: function(results) {
				console.log("Successfully deleted " + stockName);
			},
			error: function() {
				console.log("error");
			}

		})
	}

	loadClickEvents(numBoxes, deleteId + 1);
}




