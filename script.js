

$("#slide-out").sideNav();
    // added the click event for the next button to procced to profile page
    $("#next1").on("click", function(event){
        event.preventDefault();
        window.location.href = "profile.html";
        });
        
        // added a click function for calulate button 
        $("#save1").on("click", function(event){
          accountInfo=[];
          event.preventDefault();
            // created variables for each user input 
            var name=$("#name").val().trim();
            var username=$("#username").val().trim();
            var email=$("#email").val().trim();
            var password=$("#password").val().trim();
            var address=$("#city").val().trim();
            var phone=$("#phone").val().trim();
          accountInfo.push(name,username,email,password,address,phone);

          // saved in local storage under accountInfo
          localStorage.setItem("accountInfo",JSON.stringify(accountInfo));
  
        
        
        });

// end of user account javascript



// PROFILE PAGE 
// javascript includes users input to calculate target daily calorie intake (age,weight,height,goal,end-weight ==target calorie intake calculator)
    // added the click event for the next button to procced to dashboard page

    var profileInfo= [];

        $("#next").on("click", function(event){
        event.preventDefault();
        window.location.href = "dashboard.html";
        
        
        });
        
        
        // added a click function for calulate button 
        $("#run-calculation").on("click", function(event){
          profileInfo=[];
          event.preventDefault();
            // created variables for each user input 
            var age=$("#age").val().trim();
            var startWeight=$("#weight").val().trim();
            var inches=$("#height").val().trim();
            var activity=1.35;
            var goal=$("#goal").val();
            var endWeight=$("#end-weight").val().trim();
     

            
        //formula to calculate maintenance calories which are calories the body need in order to function properly based on the factors selected above by the user
        var calorieIntake=(66.473+(6.23*startWeight)+(12.7*inches)-(6.8*age)*activity,(655+(4.35*+startWeight)+(4.7*inches)-(4.7*age))*activity);
        
        // if and else statement the calulates target calories intake based on if the user wants to maintain, lose or gain.
            if (goal==="gain"){
                var dailyCalorieIntake=calorieIntake+350;
            }else if(goal==="lose"){
                var dailyCalorieIntake=calorieIntake-450;
            }
            else if (goal==="maintain"){
                var dailyCalorieIntake=calorieIntake;
            }else if (goal==="Choose your option"){
                $(".daily-calories").text("Error fields cannot be blank");
             
            }
        
        
        //   if else statement to prevent calculation if any input is blank for acurate calculation 
            if (age,startWeight,inches,endWeight===""){
                $(".daily-calories").text("Error fields cannot be blank");
                calorieIntake="";
                dailyCalorieIntake="";
                goal= "";
        
            }else {
                // adding the calculation on the
                $(".daily-calories").text("Your daily calorie intake is: "+dailyCalorieIntake.toFixed(0));
            }
        
        
            // saving profile info to local storage
            profileInfo.push(age,startWeight,inches,endWeight,goal,dailyCalorieIntake)
            localStorage.setItem("profileInfo",JSON.stringify(profileInfo));
        });

// end of profile javascript


//  DASHBOARD
// Javascript for the dashboard page includes moment.js and weather API
   


        // today's date 
        var date=moment().format('LLLL');
        // added to the main card on top of the page 
        $("#date").text(date);

        var cityArray=[];
        var weeklyCalendar=[];
        var currentWeight=[];
        retrieveCity();
        storeCity();
       

    function searchCity(city){

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


        });

    };


        function storeCity (){
          localStorage.setItem("cityArray",JSON.stringify(cityArray));
        }
    
        function retrieveCity(){
          cityArray=JSON.parse(localStorage.getItem("cityArray")||"[]");
        }

        // creating a button for user's previously search cities 
        function renderButtons(){
          $("#city-list").empty();
          for(var i=0;i<cityArray.length;i++){
              var c =$("<button>");
              c.addClass("city-btn");
              c.attr("data-name",cityArray[i]);
              c.text(cityArray[i]);
              $("#city-list").append(c);
              storeCity();
          };
        };

        // when search is clicked the weather api will run for the city based on user input
        // ******still need to call the create and call a function to have user input persist on the screen even after refreshing for the weather
        $("#select-city").on("click",function(event){
          event.preventDefault();
          var inputCity= $("#city-input").val().trim();
          searchCity(inputCity);
          cityArray.unshift(inputCity);
          renderButtons();
          // addCityList();
          $("h3").empty();
          storeCity();
        });


        // when clicking on a button generated by previouse user input the function to search a city will run
        $("#city-list").on("click",'button',function(event){ 
          console.log(event.target);
          console.log("clicky working");
          let searchCityNames=$(this).text();
          console.log(searchCity);
          searchCity(searchCityNames);
          renderButtons();
          $("h3").empty();
          storeCity();
  
        });


        // saved each day of the week input into local storage when the saved button is clicked 
        // ******still need to call the function to have user input persist on the screen even after refreshing  for the weekly calender section 
        $("#saveWeekly").on("click",function(event){
          weeklyCalender=[];
          event.preventDefault();
          var mon= $("#mon").val().trim();
          var tue= $("#tue").val().trim();
          var wed= $("#wed").val().trim();
          var thur= $("#thur").val().trim();
          var fri= $("#fri").val().trim();
          var sat= $("#sat").val().trim();
          var sun= $("#sun").val().trim();
          weeklyCalender.push(mon,tue,wed,thur,fri,sat,sun);
          localStorage.setItem("weeklyCalender",JSON.stringify(weeklyCalender));
        });

        // local storage for update weight section below 

          $("#update-weight").on("click",function(event){
            currentWeight=[];
          event.preventDefault();
          var updatedWeight= $("#current-weight").val().trim();
          currentWeight.push(updatedWeight);
          localStorage.setItem("currentWeight",JSON.stringify(currentWeight));

    
        });

 



renderButtons();
storeCity();
// end of dashboard javascript


// Generate Workout javascript

    // Work API source
    var apiURL = "https://wger.de/api/v2/"
    // Chooses English language
    var language = "?language=2"
    // Workouts approved by API 
    var status = "&status=2"
    var frontBack = true
    var muscleId = 1
    var id = 74
    var armLegIndictor = ""
    var muscleWorkArrayId = 1

    var dailyWorkoutArray= [];
    var muscleWorkoutArray= [];



    var arms = [{apiName:"Biceps brachii",
                userName:"Bicep",
                muscleid: "1",
                frontBack: true},
                {apiName: "Anterior deltoid",
                userName: "Shoulder",
                muscleid: 2,
                frontBack: true},
                {apiName: "Brachialis",
                userName: "Brachialis",
                muscleid: 13,
                frontBack:true},
                {apiName: "Latissimus dorsi",
                userName: "Lats",
                muscleid: 12,
                frontBack: false},
                {apiName: "Obliquus externus abdominis",
                userName: "Obliquus",
                muscleid: 14,
                frontBack: true},
                {apiName: "Pectoralis major",
                userName: "Pecks",
                muscleid: 4,
                frontBack: true},
                {apiName: "Rectus abdominis",
                userName: "Abs",
                muscleid: 6,
                frontBack: true},
                {apiName: "Serratus anterior",
                userName: "Serratus anterior",
                muscleid: 3,
                frontBack: true},
                {apiName: "Trapezius",
                userName: "Traps",
                muscleid: 9,
                frontBack: false},
                {apiName: "Triceps brachii",
                userName: "Triceps",
                muscleid: 5,
                frontBack: false}
]
    var legs = [{apiName: "Biceps femoris",
                userName: "Thigh",
                muscleid: 11,
                frontBack: false},
                {apiName: "Gastrocnemius",
                userName: "Gastrocnemius",
                muscleid: 7,
                frontBack: false},
                {apiName: "Gluteus maximus",
                userName: "Glutes",
                muscleid: 8,
                frontBack: false},
                {apiName: "Quadriceps femoris",
                userName: "Quads",
                muscleid: 10,
                frontBack: true},
                {apiName: "Soleus",
                userName: "Calves",
                muscleid: 15,
                frontBack: false}
    ]
 
    $("#muscleGroups").hide()
    $("#bodyChoices").hide()
    $("#workouts").hide()

    retrieveDailyWorkout()
    generateDailyWorkout()
 

    $("#genWorkout").on("click",function(){
      dailyWorkoutArray = []
      storeDailyWorkout()
      generateWorkout()
    })

    // Before generate workout function call name workout function. Unhide form for saving workout name and then call generate workout function

    $("#clearDailyWorkout").on("click",function(){
    dailyWorkoutArray = []
    console.log("Clear Storage")
    storeDailyWorkout()
    generateDailyWorkout()
    $("#genWorkout").show()
  })

  
    function generateWorkout(){
    event.preventDefault() 
    $("#genWorkout").hide()
    $("#dailyWorkout").hide()
    $("#bodyChoices").show()
    }

    // createMuclesChoices()
// Create Muscles Selection

$(".bodyChoice").on("click",function(){
    event.preventDefault();  
    $("#bodyChoices").hide();
    $("#muscleGroups").show();
    armLegIndictor = $(this).attr("id")
    console.log(armLegIndictor)
    createMuclesChoices();
})


  function createMuclesChoices(){
    $("#muscleGroups").empty();
    if(armLegIndictor == "arms"){
      console.log("arms")
      for(i=0; i < arms.length ;i++){
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",arms[i].muscleid)
        rowEl.text(arms[i].userName)
        $("#muscleGroups").append(rowEl)
      }
    }
    else{
      console.log("legs")
      for(i=0; i < legs.length ;i++){
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",legs[i].muscleid)
        rowEl.text(legs[i].userName)
        $("#muscleGroups").append(rowEl)
      }
    }
    $(".muscleGroup").on("click",function(){
    event.preventDefault();  
    $("#muscleGroup").hide();
    $("#workouts").show();
    muscleId = $(this).attr("muscleId");
    console.log(muscleId)
    generateMuscleWorkout()
    
  })

  };

// example muscles=id

function generateMuscleWorkout (){
var queryURL = apiURL+ "exercise/" +language+status+"&muscles="+muscleId;
$.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(queryURL);
    $("#workouts").empty();
    muscleWorkoutArray = []

    // cylce though all workouts based on length
    for (i=0;i<response.results.length;i++){
      var workoutName = response.results[i].name;
      var workoutDetails = response.results[i].description;
      var workoutId = response.results[i].id;
      var rowEl = $("<button>");
      rowEl.addClass("indWorkout")
      rowEl.attr("workoutID",i)
      rowEl.text(workoutName)
      var workoutDescription = workoutDetails
      $("#workouts").append(rowEl)
      rowEl.after(workoutDescription)
      muscleWorkoutArray.push({workoutName:workoutName,workoutDescription:workoutDetails}) 

      // getImage(workoutId)
    }
    console.log(muscleWorkoutArray)
    $(".indWorkout").on("click",function(){
    event.preventDefault();  
    // $("#workouts").hide();
     muscleWorkArrayId = $(this).attr("workoutID");
     console.log(muscleWorkArrayId)
     var wName = muscleWorkoutArray[muscleWorkArrayId].workoutName
     var wDescr = muscleWorkoutArray[muscleWorkArrayId].workoutDescription


    dailyWorkoutArray.push({workName: wName, workDescription: wDescr})
    console.log(dailyWorkoutArray)
    storeDailyWorkout()
    generateDailyWorkout()

})
  });
}


function generateDailyWorkout (){
  $("#muscleGroups").hide();
  $("#workouts").hide();
  $("#dailyWorkout").show();
  $("#dailyWorkout").empty();


  for (i=0; i<dailyWorkoutArray.length; i++) {

    var workoutNameEl = $("<h4>")
      workoutNameEl.text(dailyWorkoutArray[i].workName)
    var workoutDescriptionEl = dailyWorkoutArray[i].workDescription
    $("#dailyWorkout").append(workoutNameEl)
    workoutNameEl.after(workoutDescriptionEl)

  }

  }

  $("#addNewWorkout").on("click",function(){
    generateWorkout()
    console.log("add new workout")
  })
  
function storeDailyWorkout(){
    localStorage.setItem("dailyWorkoutArray",JSON.stringify(dailyWorkoutArray));
}

function retrieveDailyWorkout(){
  dailyWorkoutArray = JSON.parse(localStorage.getItem("dailyWorkoutArray") || "[]")
}

// Add workout to Dashboard
addDailyWorkout()
function addDailyWorkout(){
  retrieveDailyWorkout();
  for (i=0; i<dailyWorkoutArray.length; i++) {

    var workoutNameEl = $("<h4>")
      workoutNameEl.text(dailyWorkoutArray[i].workName)
    $("#workout").append(workoutNameEl)
  }
}

// function saveWorkoutRoutine(){

//   WorkoutRoutineArray.push({workName: "workoutName", workouts: dailyWorkoutArray})
// }

// function storeWorkoutRoutine(){
//   localStorage.setItem("WorkoutRoutineArray",JSON.stringify(WorkoutRoutineArray));
// }

// function retrieveWorkoutRoutine(){
//   WorkoutRoutineArray = JSON.parse(localStorage.getItem("WorkoutRoutineArray") || "[]")
// }

// grpah section of javascript page 

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);
var graphDetails = []
// add local storage to get profile Array
var profile = {startWeight: 200,
goalWeight:180,
timeFrame:60}
var startWeight = profile.startWeight
var goalWeight = profile.goalWeight
var timeFrame = profile.timeFrame
var lossDay = (startWeight - goalWeight)/timeFrame
// add local storage to create weightJournal based on user inputted weights
var weighthJournal = [{entryDay: 10,weight:195},
{entryDay:20,weight:190},
{entryDay:30,weight:185}]

var weightEntryID = 0
var userWeight = startWeight
var dayInput = weighthJournal[0].entryDay

// Creates array for Graph Details using User profile and weight journal
for(i=0;i<timeFrame;i++){
  console.log(dayInput)
  
  if(i === dayInput){
    userWeight = weighthJournal[weightEntryID].weight
    weightEntryID++
    if(weightEntryID = weighthJournal.length){
      weightEntryID = weighthJournal.length -1
    }
    dayInput = weighthJournal[weightEntryID].entryDay
  }

  // add momement function to change i to date
  graphDetails.push([i,startWeight,userWeight])
  startWeight = startWeight - lossDay
}


function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Goal');
      data.addColumn('number', 'Actual');
      data.ready
           

      console.log(graphDetails)
      data.addRows(
       graphDetails
      );

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Weight'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }

  
    // Or with jQuery
  
    
    

//   End Generate Workout javascript






