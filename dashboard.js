

// // grpah section of javascript page 

// google.charts.load('current', {packages: ['corechart', 'line']});
// google.charts.setOnLoadCallback(drawBasic);
// var graphDetails = []
// // add local storage to get profile Array
// var profile = {startWeight: 200,
// goalWeight:180,
// timeFrame:60}
// var startWeight = profile.startWeight
// var goalWeight = profile.goalWeight
// var timeFrame = profile.timeFrame
// var lossDay = (startWeight - goalWeight)/timeFrame
// // add local storage to create weightJournal based on user inputted weights
// var weighthJournal = [{entryDay: 10,weight:195},
// {entryDay:20,weight:190},
// {entryDay:30,weight:185}]

// var weightEntryID = 0
// var userWeight = startWeight
// var dayInput = weighthJournal[0].entryDay

// // Creates array for Graph Details using User profile and weight journal
// for(i=0;i<timeFrame;i++){
//   console.log(dayInput)
  
//   if(i === dayInput){
//     userWeight = weighthJournal[weightEntryID].weight
//     weightEntryID++
//     if(weightEntryID = weighthJournal.length){
//       weightEntryID = weighthJournal.length -1
//     }
//     dayInput = weighthJournal[weightEntryID].entryDay
//   }

//   // add momement function to change i to date
//   graphDetails.push([i,startWeight,userWeight])
//   startWeight = startWeight - lossDay
// }


// function drawBasic() {

//       var data = new google.visualization.DataTable();
//       data.addColumn('number', 'X');
//       data.addColumn('number', 'Goal');
//       data.addColumn('number', 'Actual');
//       data.ready
           

//       console.log(graphDetails)
//       data.addRows(
//        graphDetails
//       );

//       var options = {
//         hAxis: {
//           title: 'Time'
//         },
//         vAxis: {
//           title: 'Weight'
//         }
//       };

//       var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

//       chart.draw(data, options);
//     }

