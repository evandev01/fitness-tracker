// USER ACCOUNT PAGE 
// javascript includes user input to set up user account (name, username, password,email,city and phone number)
// city variable input by user will be used for weather api located on the dashboard


    // added the click event for the next button to procced to profile page
    $("#next1").on("click", function(event){
        event.preventDefault();
        window.location.href = "profile.html";
        
        
        });
        
        // added a click function for calulate button 
        $("#save1").on("click", function(event){
            // created variables for each user input 
            var name=$("#name").val().trim();
            var username=$("#username").val().trim();
            var email=$("#email").val().trim();
            var password=$("#password").val().trim();
            var address=$("#city").val().trim();
            var phone=$("#phone").val().trim();
        
        
        
        
        console.log(name);
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(address);
        console.log(phone);
        
        
        event.preventDefault();
        
        
        
        
        });

// end of user account javascript








// PROFILE PAGE 
// javascript includes users input to calculate target daily calorie intake (age,weight,height,goal,end-weight ==target calorie intake calculator)
    // added the click event for the next button to procced to dashboard page
    $("#next").on("click", function(event){
        event.preventDefault();
        window.location.href = "dashboard.html";
        
        
        });
        
        
        
        
        // added a click function for calulate button 
        $("#run-calculation").on("click", function(event){
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
        
        
        
        console.log(calorieIntake);
        console.log(age);
        console.log(startWeight);
        console.log(inches);
        console.log(goal);
        console.log(dailyCalorieIntake);
        
        
        
        
        
        event.preventDefault();
        
        
        
        
        });

// end of profile javascript


//  DASHBOARD
// Javascript for the dashboard page includes moment.js and weather API
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

// end of dashboard javascript



