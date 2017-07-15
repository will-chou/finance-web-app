
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



/*
function displayGraph(keyword){
  var urlIntraDay = "http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ keyword+"&interval=5min&outputsize=full&apikey=TH8FUMSI7QU19B39"
  var urlIntraDay30 = "http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ keyword+"&interval=30min&outputsize=full&apikey=TH8FUMSI7QU19B39"
  var urlDaily = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + keyword +"&apikey=TH8FUMSI7QU19B39"

  $.ajax({
      url: urlIntraDay,
      dataType: 'json',
      success: function(results){
        console.log(results);

        //convert JSON result into a usable JSON format

        results = results['Time Series (5min)'];

        var newJSONarray = {};
        //loop through JSON object
        var size = Object.keys(results).length;
        for(var i = 0; i < 10; i++){
          var newJSONobj = {};

          var JSONname = Object.keys(results)[i];
          console.log(JSONname);
          var JSONobj = results[JSONname];
          var date = new Date(JSONname);

          newJSONobj['date'] = date;
          newJSONobj['value'] = JSONobj['4. close'];

          newJSONarray[i] = newJSONobj;
        }

        console.log(newJSONarray);
        attemptDisplayGraph(newJSONarray);
        displayDailyGraph(newJSONarray);

      },
      error: function(){
          console.log("error");
      }
  });
}

*/


function fetchDataCurrent(){
  var keyword = document.getElementsByName('keyword')[0].value;



  var url = window.location.href + "current?symbol=" + keyword;

  event.preventDefault();

  $.ajax({
      url: url,
      dataType: 'json',
      success: function(results){
          var mountpoint = document.getElementById('mountpoint');
          mountpoint.innerHTML = "";

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

          //displayGraph(keyword);

      },
      error: function(){
          console.log("error");
      }
  });

}





window.onload =

  function(){

    document.getElementById('submit').addEventListener('click',
      function(){
        console.log("fetchdata about to be called");
        fetchDataCurrent();
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




