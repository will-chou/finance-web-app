

// var ourRequest = new XMLHttpRequest();
// ourRequest.open('GET', 'http://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=TH8FUMSI7QU19B39');
// ourRequest.onload = function(){
//   console.log(ourRequest.responseText);
// }
// ourRequest.send();


function fetchData(){
  var keyword = document.getElementsByName('keyword')[0].value;

  //var url = "http://cors.io/?http://marketdata.websol.barchart.com/getQuote.json?key=4b61ee2c98b753a90d5563947df04968&symbols=ZC*1,IBM,GOOGL,";
  var url = "http://cors.io/?http://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + keyword + "&apikey=TH8FUMSI7QU19B39";

  // $.getJSON(url, function(data){
  //   if(data.stream == null){
  //     console.log('broken');
  //   }else{
  //     console.log(data);
  //   }
  // })









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
        fetchData();
      });
  };




