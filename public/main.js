function fetchDataSector(){
  var urlSector = "http://www.alphavantage.co/query?function=SECTOR&apikey=TH8FUMSI7QU19B39";

  event.preventDefault();
  console.log("hello");

  $.ajax({
      url: urlSector,
      dataType: 'json',
      success: function(results){

          console.log(results);

      },
      error: function(){
          console.log("error");
      }
  });
}


function fetchDataHistorical(){
  var keyword = document.getElementsByName('hist-keyword')[0].value;
  var urlHistorical = "http://cors.io/?http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + keyword + "&outputsize=full&apikey=TH8FUMSI7QU19B39"

  event.preventDefault();


  $.ajax({
    url: urlHistorical,
    dataType: 'json',
    success: function(results){
      console.log(results);



    },
    error: function(results){
      console.log("couldn't grab historical data")
    }
  });


}

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

        // results = JSON.stringify(results);
        // // console.log(results);

        // var JSONArray = new Array();

        // JSONArray = $.parseJSON(results);
        // console.log(JSONArray);

        // console.log(JSONArray[0]);

        // console.log(results);



        // JSONArray = $.parseJSON(results);
        // console.log(JSONArray);

        // //put the data into an array instead of a JSON object
        // JSONArray = $.parseJSON(results['Time Series (5min)']);
        // console.log(JSONArray);


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
          // console.log(JSONobj);
          //newJSON[JSONname] = JSONobj['4. close'];
          // console.log(JSONobj['4. close'])

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


/*

function attemptDisplayGraph(data){
// define dimensions of graph
    var m = [80, 80, 80, 80]; // margins
    var w = 1000 - m[1] - m[3]; // width
    var h = 400 - m[0] - m[2]; // height
    

    function getDate(i){
      return data[i].date.getHours()*60+data[i].date.getMinutes();
    }
    //endtime
    var endTime = data[0].date.getHours()*60+data[0].date.getMinutes();
    //start time
    var startTime = data[Object.keys(data).length-1].date.getHours()*60 + data[Object.keys(data).length-1].date.getMinutes();

  //calculate max & min values
    var valueMax = 0;
    var valueMin = data[0]['value'];

    for(var i = 0; i < Object.keys(data).length; i++){
      var temp = data[i]['value'];
      if(valueMax < temp){
        valueMax = temp;
      }
      if(valueMin > temp){
        valueMin = temp;
      }
    }
    console.log(valueMin + ' blah '+ valueMax);

    // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
    // X scale will fit all values from data[] within pixels 0-w
    var x = d3.scaleLinear().domain([startTime, endTime]).range([0, w]);
    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    var y = d3.scaleLinear().domain([valueMin, valueMax]).range([h, 0]);
      // automatically determining max range can work something like this
      // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
    // create a line function that can convert data[] into x and y points
    console.log('enter');
    var line = d3.line()
      // assign the X function to plot our line as we wish
      .x(function(d,i) { 
        // verbose logging to show what's actually being done
        console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
        // return the X coordinate where we want to plot this datapoint
        console.log(d);
        return x(i); 
      })
      .y(function(d) { 
        // verbose logging to show what's actually being done
        console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
        // return the Y coordinate where we want to plot this datapoint
        console.log(d);
        console.log(y(d));
        return y(d); 
      })

      // Add an SVG element with the desired dimensions and margin.
      var graph = d3.select("#graph").append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
          .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
      // create yAxis

      var xAxis = d3.axisBottom(x);
      var yAxis = d3.axisLeft(y);
      // var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
      // Add the x-axis.
      graph.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis);
      // create left yAxis
      // var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
      // Add the y-axis to the left
      graph.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(-25,0)")
            .call(yAxis);
      
        // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
      graph.append("svg:path").attr("d", line(data));
          console.log('exit');



}


function displayDailyGraph(data){
  console.log(data);



  //add the SVG element
  var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;




    var m = [20, 20, 20, 20]; // margins
    var w = 960 - m[1] - m[3]; // width
    var h = 500 - m[0] - m[2]; // height

//setting the ranges
  var x = d3.scaleTime()
      .rangeRound([0, width]);
  var y = d3.scaleLinear()
      .rangeRound([height, 0]);



  //latest time
  var endTime = data[0].date.getHours()*60+data[0].date.getMinutes();
  //start time
  var startTime = data[Object.keys(data).length-1].date.getHours()*60 + data[Object.keys(data).length-1].date.getMinutes();

//calculate max & min values
  var valueMax = 0;
  var valueMin = data[0]['value'];

  for(var i = 0; i < Object.keys(data).length; i++){
    var temp = data[i]['value'];
    if(valueMax < temp){
      valueMax = temp;
    }
    if(valueMin > temp){
      valueMin = temp;
    }
  }
  console.log(valueMin + ' blah '+ valueMax);

//set the domains
  var x = d3.scaleTime()
              .domain([startTime,endTime])
              .rangeRound([margin*2, (width - margin)]);
  var y = d3.scaleLinear()
              .domain([valueMin, valueMax])
              .rangeRound([(height - margin), margin]);


//set the dynamic coordinates for the line
  var line = d3.line()
      .x(function(d) { return x(d.time); })
      .y(function(d) { return y(d.value); });


    // var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
    // // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    // var y = d3.scale.linear().domain([0, 10]).range([h, 0]);



      // automatically determining max range can work something like this
      // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
    // create a line function that can convert data[] into x and y points
    var line = d3.line()
      // assign the X function to plot our line as we wish
      .x(function(d,i) { 
        // verbose logging to show what's actually being done
        console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
        // return the X coordinate where we want to plot this datapoint
        return x(i); 
      })
      .y(function(d) { 
        // verbose logging to show what's actually being done
        console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
        // return the Y coordinate where we want to plot this datapoint
        return y(d); 
      })
      // Add an SVG element with the desired dimensions and margin.
      var graph = d3.select("#graph").append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
          .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
      // create yAxis
      // var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
      // // Add the x-axis.
      // graph.append("svg:g")
      //       .attr("class", "x axis")
      //       .attr("transform", "translate(0," + h + ")")
      //       .call(xAxis);

         // Add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));     
      // create left yAxis
      var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
      // Add the y-axis to the left
      graph.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(-25,0)")
            .call(yAxisLeft);
      
        // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
      graph.append("svg:path").attr("d", line(data));
}


*/

function fetchDataSimple(){
  var keyword = document.getElementsByName('keyword')[0].value;

  //var url = "http://cors.io/?http://marketdata.websol.barchart.com/getQuote.json?key=4b61ee2c98b753a90d5563947df04968&symbols=ZC*1,IBM,GOOGL,";
  var url = "http://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + keyword + "&apikey=TH8FUMSI7QU19B39";



  event.preventDefault();

  $.ajax({
      url: url,
      dataType: 'json',
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': 'Content-Type',
      //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
      // },
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




    // Response.status(200)
    // .header("Access-Control-Allow-Origin", "*")
    // .header("Access-Control-Allow-Headers", "Content-Type")
    // .header("Access-Control-Allow-Methods", "POST, OPTIONS") //CAN BE ENHANCED WITH OTHER HTTP CALL METHODS 
    // .build();
window.onload =



  function(){
    document.getElementById('submit').addEventListener('click',
      function(){
        console.log("fetchdata about to be called");
        fetchDataSimple();
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




