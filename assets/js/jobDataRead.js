//GLOBALS
var DATA_URL = 'https://docs.google.com/spreadsheets/d/1rZCyz2gIUeZ2yr7oNToceAiZoK-8WBIrL8elu9fscoY/edit?usp=sharing'
//initialize loading in data for events

var jobData; 
var isFullTime = false;

function startSystem(){
  initSystem();
}
//initializes reading and render of event info
function initSystem() {
  Tabletop.init( { key: DATA_URL,
                   callback: displayGeneralInfo,
                   simpleSheet: true } )
}

function displayGeneralInfo(data, tabletop) {
  storeData(data);
  var body = document.getElementById("bodyContent");
  renderData("",0,body);
}
function storeData(data){
  jobData = data;
}

function addEntry(bodyElement,dataId) {
	var newRow = document.createElement("tr"); 
	var newComp = document.createElement("td"); 
	newComp.innerHTML=jobData[dataId].company;	
	var newTitle = document.createElement("td"); 
	newTitle.innerHTML=jobData[dataId].jobTitle;
	var newType = document.createElement("td"); 
	newType.innerHTML=jobData[dataId].jobType;
	var newLocation = document.createElement("td");
	newLocation.innerHTML=jobData[dataId].jobLocation;
	var newApply = document.createElement("td");
	var applyText = document.createElement("a");
	applyText.innerHTML = "Apply";
	applyText.href = jobData[dataId].jobDetailsUrl;
	newApply.appendChild(applyText);
	newRow.appendChild(newComp);
	newRow.appendChild(newTitle);
	newRow.appendChild(newType);
	newRow.appendChild(newLocation);
	newRow.appendChild(newApply);
	bodyElement.appendChild(newRow);
}
function renderData(typeName,isAsc,bodyElement){
	for (var i = 0; i < jobData.length; i++) {
		addEntry(bodyElement,i);
	}
}

window.addEventListener('DOMContentLoaded', startSystem);