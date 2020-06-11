

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
                imageLink: "/assets/images/test",
                frontBack: true},
                {apiName: "Anterior deltoid",
                userName: "Shoulder",
                muscleid: 2,
                imageLink: "test",
                frontBack: true},
                {apiName: "Brachialis",
                userName: "Brachialis",
                muscleid: 13,
                imageLink: "test",
                frontBack:true},
                {apiName: "Latissimus dorsi",
                userName: "Lats",
                muscleid: 12,
                imageLink: "test",
                frontBack: false},
                {apiName: "Obliquus externus abdominis",
                userName: "Obliquus",
                muscleid: 14,
                imageLink: "test",
                frontBack: true},
                {apiName: "Pectoralis major",
                userName: "Pecks",
                muscleid: 4,
                imageLink: "test",
                frontBack: true},
                {apiName: "Rectus abdominis",
                userName: "Abs",
                muscleid: 6,
                imageLink: "test",
                frontBack: true},
                {apiName: "Serratus anterior",
                userName: "Serratus anterior",
                muscleid: 3,
                imageLink: "test",
                frontBack: true},
                {apiName: "Trapezius",
                userName: "Traps",
                muscleid: 9,
                imageLink: "test",
                frontBack: false},
                {apiName: "Triceps brachii",
                userName: "Triceps",
                muscleid: 5,
                imageLink: "test",
                frontBack: false}
]
    var legs = [{apiName: "Biceps femoris",
                userName: "Thigh",
                muscleid: 11,
                imageLink: "test",
                frontBack: false},
                {apiName: "Gastrocnemius",
                userName: "Gastrocnemius",
                muscleid: 7,
                imageLink: "test",
                frontBack: false},
                {apiName: "Gluteus maximus",
                userName: "Glutes",
                muscleid: 8,
                imageLink: "test",
                frontBack: false},
                {apiName: "Quadriceps femoris",
                userName: "Quads",
                muscleid: 10,
                imageLink: "test",
                frontBack: true},
                {apiName: "Soleus",
                userName: "Calves",
                muscleid: 15,
                imageLink: "test",
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


//   End Generate Workout javascript


// USER ACCOUNT PAGE 
// javascript includes user input to set up user account (name, username, password,email,city and phone number)

// var accountInfo=[];

//     // added the click event for the next button to procced to profile page
//     $("#next1").on("click", function(event){
//         event.preventDefault();
//         window.location.href = "profile.html";
        
        
//         });
        
//         // added a click function for calulate button 
//         $("#save1").on("click", function(event){
//           accountInfo=[];
//           event.preventDefault();
//             // created variables for each user input 
//             var name=$("#name").val().trim();
//             var username=$("#username").val().trim();
//             var email=$("#email").val().trim();
//             var password=$("#password").val().trim();
//             var address=$("#city").val().trim();
//             var phone=$("#phone").val().trim();
//           accountInfo.push({name:name,userName:username,email:email,password:password,address:address,phone:phone});

//           // saved in local storage under accountInfo
//           localStorage.setItem("accountInfo",JSON.stringify(accountInfo));
  
        
        
//         });

// end of user account javascript


// PROFILE PAGE 
// javascript includes users input to calculate target daily calorie intake (age,weight,height,goal,end-weight ==target calorie intake calculator)
    // added the click event for the next button to procced to dashboard page

    var profileInfo= [];

    retrieveCalories()

        $("#next").on("click", function(event){
        event.preventDefault();
        window.location.href = "workout.html";
        storeCalories()
        
        
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
            var goalTime=$("#goalDays").val().trim();
            storeCalories()
     

            
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
                $(".daily-calories").text("Your daily calorie intake is: "+dailyCalorieIntake);
            }

            var startDate=moment().format('L');

            
        
        
            // saving profile info to local storage
            profileInfo.push({age:age,startWeight:startWeight,height:inches,goalWeight:endWeight,goal:goal,calories:dailyCalorieIntake, goalTime:goalTime,startDate:startDate})

            storeCalories()

            addCalories()
            addStartWeight()
            addGoalWeight()
        });

              addCalories()
              function addCalories(){
              retrieveCalories();
        
            
              var caloriesPost= $("<h8>");
              caloriesPost.text("Calories: "+ profileInfo[0].calories)
              $("#calories").append(caloriesPost)
      
              
            }
      
      
            addStartWeight()
            function addStartWeight(){
              retrieveCalories();
              var startWeightPost= $("<h8>");
              startWeightPost.text("Start Weight: "+profileInfo[0].startWeight)
              $("#current-weight").append(startWeightPost)
      
              
            }
            addGoalWeight()
            function addGoalWeight(){
              retrieveCalories();
              var goalWeightPost= $("<h8>");
              goalWeightPost.text("Goal Weight: "+profileInfo[0].goalWeight)
              $("#goal-weight").append(goalWeightPost)
      
              
            }


        function storeCalories(){
          localStorage.setItem("profileInfo",JSON.stringify(profileInfo));
          weightJournal = []
          storeWeightJournal()

      }
      
      function retrieveCalories(){
        profileInfo = JSON.parse(localStorage.getItem("profileInfo") || "[]")
      }

     

// end of profile javascript

//  DASHBOARD
// Javascript for the dashboard page includes moment.js and weather API
   

        // today's date 
        var date=moment().format('L');
        // added to the main card on top of the page 
        $("#date").text(date);

        var cityArray=[];
        var weeklyCalender=[];
        var currentWeight=[];
        retrieveCity();
        storeCity();
        retrieveCalender();
        retrieveCalories();
       

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

        // 
        function storeCity (){
          localStorage.setItem("cityArray",JSON.stringify(cityArray));
        }
    
        function retrieveCity(){
          cityArray=JSON.parse(localStorage.getItem("cityArray")||"[]");

          searchCity(cityArray[0])
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
              storeCalender()
          };
        };

        // when search is clicked the weather api will run for the city based on user input
   
        $("#select-city").on("click",function(event){
          event.preventDefault();
          var inputCity= $("#city-input").val().trim();
          searchCity(inputCity);
          cityArray.unshift(inputCity);
          renderButtons();
          $("h3").empty();
          storeCity();
          storeCalender()
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
          storeCalender()
  
        });

        // saved each day of the week input into local storage when the saved button is clicked 
    
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
          weeklyCalender.push({monday:mon,tuesday:tue,wednesday:wed,thursday:thur,friday:fri,saturday:sat,sunday:sun});

          console.log(weeklyCalender)
          storeCalender()
          addCalender()
    
        

        });

        // local storage for update weight section below 

          $("#update-weight").on("click",function(event){
          currentWeight=[];
          event.preventDefault();
          var updatedWeight= $("#current-weight").val().trim();
          currentWeight.push(updatedWeight);
          localStorage.setItem("currentWeight",JSON.stringify(currentWeight));
          storeCalender()

    
        });
        storeCalender()
        function storeCalender (){
          localStorage.setItem("weeklyCalender",JSON.stringify(weeklyCalender));
        }
        retrieveCalender()
        function retrieveCalender(){
          weeklyCalender=JSON.parse(localStorage.getItem("weeklyCalender")||"[]");
        }

       addCalender()
        function addCalender(){
          retrieveCalender();
          
          $("#mon").text(weeklyCalender[0].monday)
         
          $("#tue").text(weeklyCalender[0].tuesday)
        
          $("#wed").text(weeklyCalender[0].wednesday)
    
          $("#thur").text(weeklyCalender[0].thursday)

          $("#fri").text(weeklyCalender[0].friday)

          $("#sat").text(weeklyCalender[0].saturday)
        
          $("#sun").text(weeklyCalender[0].sunday)
   
        
        }

        

 


renderButtons();
storeCity();
// end of dashboard javascript



// graph section of javascript page 



$("#update-weight").on("click",function(){
  event.preventDefault();
  console.log("check")
  weightJournal = []
  retrieveWeightJournal()
  // var entryWeight = $("#current-weight").val()
  var entryWeight = 190
  // var startDateInput = moment("6/6/2020","MM/DD/YYYY")
  var startDateInput = moment(profileInfo[0].startDate,"MM/DD/YYYY")
  var currentDateInput = moment().format('L') ;
  var duration = moment.duration(startDateInput.diff(currentDateInput));
  var entryDayInput = duration.asDays()*-1;
  console.log(entryDayInput)
  weightJournal.push({entryDay: entryDayInput,weight: entryWeight})
console.log(weightJournal)
graphDetails = []
storeWeightJournal()
createGraphDetails()
drawBasic()
})

retrieveWeightJournal()
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);
var graphDetails = []
// add local storage to get profile Array
var profile = {startWeight: profileInfo[0].startWeight,
goalWeight:profileInfo[0].goalWeight,
timeFrame:profileInfo[0].goalTime}
var startWeight = parseInt(profile.startWeight,10)
var goalWeight = parseInt(profile.goalWeight,10)
var timeFrame = parseInt(profile.timeFrame,0)
var lossDay = (startWeight - goalWeight)/timeFrame

if (weightJournal == ''){
  weightJournal.push({entryDay: 0,weight: startWeight})
  storeWeightJournal()
  }

createGraphDetails()
function createGraphDetails(){

var weightEntryID = 0
var startWeight = parseInt(profile.startWeight,10)
var dayInput = weightJournal[0].entryDay

// Creates array for Graph Details using User profile and weight journal
for(i=0;i<timeFrame;i++){
  console.log(dayInput)
  
  if(i === dayInput){
    userWeight = weightJournal[weightEntryID].weight
    weightEntryID++
    if(weightEntryID = weightJournal.length){
      weightEntryID = weightJournal.length -1
    }
    dayInput = weightJournal[weightEntryID].entryDay
  }

  // add momement function to change i to date
  graphDetails.push([i,startWeight,userWeight])
  startWeight = startWeight - lossDay
}
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
  

    function storeWeightJournal(){
      localStorage.setItem("weightJournal",JSON.stringify(weightJournal));
    }
    
    function retrieveWeightJournal(){
    weightJournal = JSON.parse(localStorage.getItem("weightJournal") || "[]")
    }






