

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
      success: function(results){
<<<<<<< HEAD

        console.log(results);
        var mountpoint = document.getElementById('mountpoint');


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

        infoBox.className = "infoBox";
        textName.className = "stockName";
        textPrice.className = "stockInfo";
        textPriceChange.className = "stockInfo";
        textPriceChangePercent.className = "stockInfo";
        
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


        var bar = document.createElement('div');
        bar.className = "bar";


        infoBox.appendChild(textName);
        infoBox.appendChild(bar);
        infoBox.appendChild(textPrice);
        infoBox.appendChild(textPriceChange);
        infoBox.appendChild(textPriceChangePercent);

        mountpoint.appendChild(infoBox);




        
=======
        var display = true;
>>>>>>> 3fc6f21bf3c2f3769321a111668ac0a783039fd7
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

        // $.ajax({
        //     url: "/mongo/update/" + keyword,
        //     type: "PUT",
        // }).done(function(updateResults){
        //       console.log("updateResults: " + updateResults);
        //       if(updateResults === "Symbol already saved") {
        //         display = false;
        //       }
        // }).fail(function(){
        //       console.log("error");
        //     }
        // });

        console.log("Display boolean: " + display);

        if(display) {
          console.log(results);
          var mountpoint = document.getElementById('mountpoint');


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
        }

      },
      error: function(){
        console.log("error");
      }
  });

}





window.onload =

  function(){




    /////////////
    // SUMBITS //
    /////////////

    document.getElementById('submit').addEventListener('click',
      function(){
        console.log("fetchdata about to be called");

        fetchDataCurrent();

        //close the modal
      });
    // document.getElementById('hist-submit').addEventListener('click',
    //   function(){
    //     console.log("historical data gonna be grabbed");
    //     fetchDataHistorical();
    //   });

    fetchDataSector();



  };




