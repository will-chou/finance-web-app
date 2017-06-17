

function fetchData(){
  var keyword = document.getElementsByName('keyword')[0].value;

  event.preventDefault();

  $.ajax({
      url: "http://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + keyword + "&apikey=TH8FUMSI7QU19B39",
      dataType: 'json',
      success: function(results){

          console.log(results);


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

