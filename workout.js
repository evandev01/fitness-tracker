

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
  


    var biceps = [{apiName:"Biceps brachii",
    userName:"Bicep",
    muscleid: "1",
    imageLink: "./assets/muscle-groups/biceps.jpg",
    frontBack: true},
    {apiName: "Brachialis",
    userName: "Brachialis",
    muscleid: 13,
    imageLink: "./assets/muscle-groups/biceps.jpg",
    frontBack:true}];
var shoulder = [{apiName: "Anterior deltoid",
    userName: "Shoulder",
    muscleid: 2,
    imageLink: "./assets/muscle-groups/shoulders.jpg",
    frontBack: true}];
var back = [
    {apiName: "Latissimus dorsi",
    userName: "Lats",
    muscleid: 12,
    imageLink: "./assets/muscle-groups/back.jpg",
    frontBack: false},
    {apiName: "Serratus anterior",
    userName: "Serratus anterior",
    muscleid: 3,
    imageLink: "./assets/muscle-groups/back.jpg",
    frontBack: true},
    {apiName: "Trapezius",
    userName: "Traps",
    muscleid: 9,
    imageLink: "./assets/muscle-groups/back.jpg",
    frontBack: false}];
var abs = [ {apiName: "Rectus abdominis",
    userName: "Abs",
    muscleid: 6,
    imageLink: "./assets/muscle-groups/abs.jpg",
    frontBack: true},
    {apiName: "Obliquus externus abdominis",
    userName: "Obliquus",
    muscleid: 14,
    imageLink: "./assets/muscle-groups/abs.jpg",
    frontBack: true}];
var chest = [{apiName: "Pectoralis major",
    userName: "Pecks",
    muscleid: 4,
    imageLink: "./assets/muscle-groups/chest.jpg",
    frontBack: true}];
var triceps = [{apiName: "Triceps brachii",
    userName: "Triceps",
    muscleid: 5,
    imageLink: "./assets/muscle-groups/triceps.jpg",
    frontBack: false}];
var legs = [{apiName: "Biceps femoris",
    userName: "Thigh",
    muscleid: 11,
    imageLink: "./assets/muscle-groups/hamstrings.jpg",
    frontBack: false},
    {apiName: "Quadriceps femoris",
    userName: "Quads",
    muscleid: 10,
    imageLink: "./assets/muscle-groups/quadriceps.jpg",
    frontBack: true},
    {apiName: "Soleus",
    userName: "Calves",
    muscleid: 15,
    imageLink: "./assets/muscle-groups/calves.jpg",
    frontBack: false},
    {apiName: "Gastrocnemius",
    userName: "Gastrocnemius",
    muscleid: 7,
    imageLink: "./assets/muscle-groups/calves.jpg",
    frontBack: false}]
var glutes = [{apiName: "Gluteus maximus",
    userName: "Glutes",
    muscleid: 8,
    imageLink: "./assets/muscle-groups/glutes.jpg",
    frontBack: false}];

   
 
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
      for(i=0; i < biceps.length ;i++){
        var bicepsDiv = $("<row>");
        bicepsDiv.addClass("<div>");
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",biceps[i].muscleid)
        rowEl.text(biceps[i].userName)
        var imageEl = $("<img>")
        imageEl.attr("src",biceps[i].imageLink)
        bicepsDiv.append(rowEl)
        bicepsDiv.append(imageEl)
        $("#muscleGroups").append(bicepsDiv)
      }
      for(i=0; i < shoulder.length ;i++){
        var shoulderDiv = $("<row>");
        shoulderDiv.addClass("<div>");
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",shoulder[i].muscleid)
        rowEl.text(shoulder[i].userName)
        var imageEl = $("<img>")
        imageEl.attr("src",shoulder[i].imageLink)
        shoulderDiv.append(rowEl)
        shoulderDiv.append(imageEl)
        $("#muscleGroups").append(shoulderDiv)
      }
      for(i=0; i < back.length ;i++){
        var backDiv = $("<row>");
        backDiv.addClass("<div>");
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",back[i].muscleid)
        rowEl.text(back[i].userName)
        var imageEl = $("<img>")
        imageEl.attr("src",back[i].imageLink)
        backDiv.append(rowEl)
        backDiv.append(imageEl)
        $("#muscleGroups").append(backDiv)
      }
      for(i=0; i < abs.length ;i++){
        var absDiv = $("<row>");
        absDiv.addClass("<div>");
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",abs[i].muscleid)
        rowEl.text(abs[i].userName)
        var imageEl = $("<img>")
        imageEl.attr("src",abs[i].imageLink)
        absDiv.append(rowEl)
        absDiv.append(imageEl)
        $("#muscleGroups").append(absDiv)
      }
      for(i=0; i < chest.length ;i++){
        var chestDiv = $("<row>");
        chestDiv.addClass("<div>");
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",chest[i].muscleid)
        rowEl.text(chest[i].userName)
        var imageEl = $("<img>")
        imageEl.attr("src",chest[i].imageLink)
        chestDiv.append(rowEl)
        chestDiv.append(imageEl)
        $("#muscleGroups").append(chestDiv)
      }
      for(i=0; i < triceps.length ;i++){
        var tricepsDiv = $("<row>");
        tricepsDiv.addClass("<div>");
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",triceps[i].muscleid)
        rowEl.text(triceps[i].userName)
        var imageEl = $("<img>")
        imageEl.attr("src",triceps[i].imageLink)
        tricepsDiv.append(rowEl)
        tricepsDiv.append(imageEl)
        $("#muscleGroups").append(tricepsDiv)
      }
    }
    else{
      console.log("legs")
      for(i=0; i < legs.length ;i++){
        var legsDiv = $("<row>");
        legsDiv.addClass("<div>");
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",legs[i].muscleid)
        rowEl.text(legs[i].userName)
        var imageEl = $("<img>")
        imageEl.attr("src",legs[i].imageLink)
        legsDiv.append(rowEl)
        legsDiv.append(imageEl)
        $("#muscleGroups").append(legsDiv)
      }
      for(i=0; i < glutes.length ;i++){
        var glutesDiv = $("<row>");
        glutesDiv.addClass("<div>");
        var rowEl = $("<button>")
        rowEl.addClass("muscleGroup")
        rowEl.attr("muscleId",glutes[i].muscleid)
        rowEl.text(glutes[i].userName)
        var imageEl = $("<img>")
        imageEl.attr("src",glutes[i].imageLink)
        glutesDiv.append(rowEl)
        glutesDiv.append(imageEl)
        $("#muscleGroups").append(glutesDiv)
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