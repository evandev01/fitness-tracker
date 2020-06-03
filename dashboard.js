

// city will later be replaced by a user input of current city 
    var city= "charlotte";

// start of weather API
    var APIKey="3341ac9d2dd138ac14d34cba050bc29f";

    var queryURL="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
    
    console.log(response);

    console.log(response.main.temp);

    // tempreature converstion formulat to fahrenheit 
    var tempFunction=(response.main.temp -273.15)*1.80+32;
    var temp=tempFunction.toFixed(0);

// adding tempreature to the card at the top
    $("h6").text("Tempreature: "+temp);

   console.log(temp);

//  adding icon of weather to the card based on the API with conditions 
   var icon=response.weather[0].main;

   if (icon==="Rain"){
      $("h3").append($("<img>",{id:"rain",src:"Assets/rain.jpg", width:"50",height:"50"}))
                
    }else if (icon==="Clear"){
      $("h3").append($("<img>",{id:"rain",src:"Assets/sunny.png", width:"50",height:"50"}))

    }else if (icon==="Clouds"){
      $("h3").append($("<img>",{id:"rain",src:"Assets/cloud.jpg", width:"50",height:"50"}))
    }

    console.log(icon);

// adding moment js for each block including the main top card 


    // today's date 
    var date=moment().format('LLLL');
      // added to the main card on top of the page 
    $("#date").text(date);


    // tomorrow's date 
    var nextDay=moment().add(1, 'days').calendar(); 
      // added tomorrow's date to the first section day 1 section of html
    $("#date1").text(nextDay);



    // date for two days later 
    var twoDays=moment().add(2, 'days').calendar(); 
      // added to the second section day 2 section of html
    $("#date2").text(twoDays);
    
    // date for three days later 
    var threeDays=moment().add(3, 'days').calendar(); 
      // added to the third section day 3 section of html
    $("#date3").text(threeDays);
    

    // date for four days later
    var fourDays=moment().add(4, 'days').calendar(); 
      // added to the fourth section 4 section of html
    $("#date4").text(fourDays);
    

    // date for five days later
    var fiveDays=moment().add(5, 'days').calendar(); 
      // added to the fifth section 5 section of html
    $("#date5").text(fiveDays);
    

    // date for six days later
    var sixDays=moment().add(6, 'days').calendar(); 
      // added to the sixth section 5 section of html
    $("#date6").text(sixDays);
    

    // date for seven days later
    var sevenDays=moment().add(7, 'days').calendar(); 
      // added to the seventh section 5 section of html
    $("#date7").text(sevenDays);


    });






// grpah section of javascript page 

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Dogs');
    data.addColumn('number', 'Cats');

    data.addRows([
      [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
      [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
      [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
      [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
      [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
      [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
      [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
      [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
      [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
      [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
      [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
      [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
    ]);

    var options = {
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'Popularity'
      },
      series: {
        1: {curveType: 'function'}
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

