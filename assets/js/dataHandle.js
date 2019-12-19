  var eventSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1OrcE2Y49yIGPfKYSlQnqHWWVWR3eT-VVz37uOpp0PE0/edit?usp=sharing';

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
      //create and append paragraph to container
      var newPar = document.createElement("P"); 
      newPar.innerHTML = data[i].description;
      newNodeContainer.appendChild(newPar);  
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