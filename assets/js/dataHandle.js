//GLOBALS
var AT_STRING = " from ";
var IN_STRING = " in room ";
var eventSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1OrcE2Y49yIGPfKYSlQnqHWWVWR3eT-VVz37uOpp0PE0/edit?usp=sharing';

//initialize loading in data for events
  function initEvents() {
    Tabletop.init( { key: eventSpreadsheetUrl,
                     callback: displayEventInfo,
                     simpleSheet: true } )
  }

  function displayEventInfo(data, tabletop) {
   
    var eventBin = document.getElementById("eventBin");




    var numEvents = data.length;

    for (var i = 0; i < numEvents; i++) {
      //create and append header 
      var newNodeHead = document.createElement("DT"); 
      newNodeHead.innerHTML = data[i].eventName;
      eventBin.appendChild(newNodeHead);  


      //create and append container 
      var newNodeContainer = document.createElement("DD"); 
      //create and append primary information paragraph to container
      var infoPar = document.createElement("DIV"); 
      var timeRange  = "<b>"+data[i].timeRange+"</b>";
      var date = "<b>"+data[i].date+"</b>";
      var room =  "<b>"+data[i].room+"</b>";
      infoPar.innerHTML = date+ AT_STRING + timeRange + IN_STRING + room;
      newNodeContainer.appendChild(infoPar);  
      //create and append description paragraph to container
      var descriptionPar = document.createElement("P"); 
      descriptionPar.innerHTML = data[i].description;
      newNodeContainer.appendChild(descriptionPar);  


      eventBin.appendChild(newNodeContainer);  



      /*
      console.log(data[i].description);
      console.log(data[i].timeRange);
      console.log(data[i].room);
      console.log(data[i].date);
      */
    }


  }

  window.addEventListener('DOMContentLoaded', initEvents)