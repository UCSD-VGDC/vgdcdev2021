//GLOBALS
var DATA_URL = 'https://docs.google.com/spreadsheets/d/1rZCyz2gIUeZ2yr7oNToceAiZoK-8WBIrL8elu9fscoY/edit?usp=sharing'
//initialize loading in data for events

var jobData;
var currData;  
var isFullTime = true;
var fullTimeState;
var internState; 
var fullCount = 0;
var internCount = 0;

function startSystem(){
  initSystem();
  initButtons();
}
//initializes reading and render of event info
function initSystem() {
  Tabletop.init( { key: DATA_URL,
                   callback: displayGeneralInfo,
                   simpleSheet: true } )
}

function initButtons() {
	document.getElementById("priority-full").onclick = FilterFullTime;
	document.getElementById("priority-internship").onclick = FilterInternships;
	document.getElementById("searchBar").onkeyup = FilterString;
	document.getElementById("searchButton").onclick = FilterString;
	fullTimeState = document.getElementById("fullTimeState");
	internState = document.getElementById("internState");	
}
function storeData(data) {
	currData = jobData;	
}
function addEntry(bodyElemnt,dataId) {
	var newRow = document.createElement("tr"); 
	var newComp = document.createElement("td"); 
	newComp.innerHTML=currData[dataId].company;	
	newRow.appendChild(newApply);
	bodyElement.appendChild(newRow);
}
function FilterString(){
	var searchTerm = document.getElementById("searchBar").value.toLowerCase();
	currData =[];
	fullCount = 0;
	internCount = 0;
	for (var i = 0; i < jobData.length; i++) {
		if (jobData[i].jobTitle.toLowerCase().includes(searchTerm)) {
			currData.push(jobData[i]);
		}
		else if (jobData[i].jobLocation.toLowerCase().includes(searchTerm)) {
			currData.push(jobData[i]);
		}
		else if (jobData[i].jobType.toLowerCase().includes(searchTerm)) {
			currData.push(jobData[i]);
		}
		else if (jobData[i].dutiesString.toLowerCase().includes(searchTerm)) {
			currData.push(jobData[i]);
		}
		else if (jobData[i].reqString.toLowerCase().includes(searchTerm)) {
			currData.push(jobData[i]);
		}
		else if (jobData[i].company.toLowerCase().includes(searchTerm)) {
			currData.push(jobData[i]);
		}
	}
	console.log(currData);
	if (isFullTime) {
		FilterFullTime();
	}
	else {
		FilterInternships();
	}
	internState.innerHTML = "INTERNSHIP (" + internCount +")";
	fullTimeState.innerHTML = "Full time (" + fullCount +")";
}
function FilterInternships(){
	var body = document.getElementById("bodyContent");
	renderData("intern", 0, body)
	isFullTime = false;
}
function FilterFullTime(){
	var body = document.getElementById("bodyContent");
	renderData("fullTime", 0, body)
	isFullTime = true;
}

function displayGeneralInfo(data, tabletop) {
  storeData(data);
  var body = document.getElementById("bodyContent");
  renderData("fullTime", 0, body);
  internState.innerHTML = "INTERNSHIP (" + internCount +")";
  fullTimeState.innerHTML = "Full time (" + fullCount +")";
}
function storeData(data){
  jobData = data;
  currData = jobData;
}

function renderData(typeName,isAsc,bodyElement){
	while (bodyElement.firstChild) {
    	bodyElement.removeChild(bodyElement.firstChild);
  	}
  	for (var i = 0; i < currData.length; i++) {
		if (currData[i].isInternship == "no") {
			fullCount++;
			if (typeName != "intern" || typeName == "") {
				addEntry(bodyElement,i);
			}
		}
		else {
			internCount++;
			if (typeName == "intern" || typeName == "") {
				addEntry(bodyElement,i);
			}
		}
	}
}
window.addEventListener('DOMContentLoaded', startSystem);
