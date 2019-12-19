//GLOBALS
var AT_STRING = " from ";
var IN_STRING = " in ";
var eventSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1OrcE2Y49yIGPfKYSlQnqHWWVWR3eT-VVz37uOpp0PE0/edit?usp=sharing';
var textSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Vm2Gqg-lSGlC6E0K8HxRQ43Ezr73HLF7nOTJnQ8VTuo/edit?usp=sharing';
var affilateSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1a2uw-hQ9gd2x85oe_mvbOJ3brnlluaIyzjzYnxQDYio/edit?usp=sharing'
//initialize loading in data for events
function initPage(){
  initEvents();
  initBanner();
  initAffiliate();
}
//initializes reading and render of event info
function initEvents() {
  Tabletop.init( { key: eventSpreadsheetUrl,
                   callback: displayEventInfo,
                   simpleSheet: true } )
}
//initializes reading and render of banner info
function initBanner() {
  Tabletop.init( { key: textSpreadsheetUrl,
                   callback: displayIntroInfo,
                   simpleSheet: true } )
}

function initAffiliate() {
  Tabletop.init( { key: affilateSpreadsheetUrl,
                   callback: displayAffiliateInfo,
                   simpleSheet: true } )
}
function displayAffiliateInfo(data, tabletop) {
  var affiliateBin = document.getElementById("affiliateBin");
  renderAffiliateList(affiliateBin,data);
}

function displayEventInfo(data, tabletop) {
  var eventBin = document.getElementById("eventBin");
  if (checkDataEmpty(eventBin,data)) 
  {
    renderEventList(eventBin,data);
  }
}

function displayIntroInfo(data, tabletop) {
  var mainHeader = document.getElementById("majorHeader");
  var introText = document.getElementById("introContent");
  introText.innerHTML=data[0].introText;
  mainHeader.innerHTML=data[0].headerText;
  console.log("data:" + data.introText);
}

function appendHeader(parentComponent, data) {
   var newNodeHeader = document.createElement("DT"); 
   newNodeHeader.innerHTML = "<h3>"+data.eventName+"</h3>";
   parentComponent.appendChild(newNodeHeader);  
}
//<a href="https://www.igda.org/#">IGDA</a><br>
function appendAffiliate(parentComponent, data) {
   var newAffiliate = document.createElement("a"); 
   newAffiliate.innerHTML =  data.nameOfAffiliate;
   newAffiliate.href = data.affiliateLink;
   parentComponent.appendChild(newAffiliate);  
   parentComponent.appendChild(document.createElement("br"));  
}

function appendInfo(parentComponent, data) {
   var newNodeContainer = document.createElement("DD"); 
    //create and append primary information paragraph to container
    var infoPar = document.createElement("H4"); 
    var timeRange = "<u>"+ data.timeRange+"</u>";
    var date = "<u>"+data.date+"</u>";
    var room =  "<u>"+data.room+"</u>";
    infoPar.innerHTML = date+ AT_STRING + timeRange + IN_STRING + room;
    newNodeContainer.appendChild(infoPar);  
    //create and append description paragraph to container
    var descriptionPar = document.createElement("P"); 
    descriptionPar.innerHTML = data.description;
    newNodeContainer.appendChild(descriptionPar);  
    parentComponent.appendChild(newNodeContainer);  
}

//checks if db is empty, if so adds generic event info
function checkDataEmpty(parentComponent, data){ 
  if (data.length == 0) {
    appendHeader(parentComponent,"No New Events Planned Yet");
    return false; 
  }
  else {
    return true;
  }
}

//iterate through events in db and append them as elements to site 
function renderEventList(parentComponent, data){
  numEvents = data.length;
  for (var i = 0; i < numEvents; i++) {
    //create and append header 
    appendHeader(parentComponent,data[i]);
    //create and append container 
    appendInfo(parentComponent, data[i]);
  }
}

//iterate through events in db and append them as elements to site 
function renderAffiliateList(parentComponent, data){
  numEvents = data.length;
  for (var i = 0; i < numEvents; i++) {
    appendAffiliate(parentComponent,data[i]);
  }
}
window.addEventListener('DOMContentLoaded', initPage)