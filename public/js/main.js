
function fetchDataSector(){

  var urlSector = window.location.href + "sector"
  console.log(urlSector);
  $.ajax({
      url: urlSector,
      dataType: 'json',
      success: function(results){
          console.log(results);

          ///////////
          // TO DO //
          ///////////

          //display results

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




        
        //displayGraph(keyword);
        //ADD SYMBOL TO USER'S SHIT
        $.ajax({
            url: "/mongo/update/" + keyword,
            type: "PUT",
            success: function(results){
              console.log(results);
            },
            error: function(){
              console.log("error");
            }
        });


        

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


  };




