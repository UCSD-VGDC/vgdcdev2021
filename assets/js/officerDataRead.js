//GLOBALS
var DATA_URL = 'https://docs.google.com/spreadsheets/d/1JsBeR6k26ml90tq6mCo6Q7K27SuDZvfvgYJf1xsRScw/edit?usp=sharing'
var leftSide;
var rightSide;

function startSystem(){
  initSystem();
}
//initializes reading and render of event info
function initSystem() {
  Tabletop.init( { key: DATA_URL,
                   callback: initOfficers,
                   simpleSheet: true } )
}

function initOfficers(data, tabletop) {
	 leftSide = document.getElementById("left");
	 rightSide = document.getElementById("right");
	var length = data.length;
	for (var i = 0; i < length; i++) {
		addOfficer(data,i);
	}
}

/*
 *	<div class="col-4">'
 <a  href= "https://www.linkedin.com/in/brent-vanzant-65580116a/" class="image fit">
 <img src="https://capenetworks.com/static/images/testimonials/user-icon.svg" alt="" />
 </a>
 </div>
 */
function addOfficer(data,dataId) {
	var newDiv = document.createElement("div"); 
	newDiv.classList.add('col-4');
	var newCenter = document.createElement("center");
	newCenter.innerHTML = data[dataId].Name;

	var nextCenter = document.createElement("center"); 
	var nextText =  document.createElement("small");
	nextText.style.fontSize = "small";
	nextText.style.lineHeight = "0.5";
	nextText.innerHTML = data[dataId].Major;
	
	nextCenter.appendChild(nextText);
	var newA = document.createElement("a"); 
	newA.href = data[dataId].Linkedin;
	newA.classList.add('image');
	newA.classList.add('fit');
	var newIMG = document.createElement("img"); 
	newIMG.src = data[dataId].ProfilePic;

	newA.appendChild(newIMG);
	newDiv.appendChild(newA);
	newDiv.appendChild(newCenter);
	newDiv.appendChild(nextCenter);

	var num = Math.floor(dataId/3);
	if (num%2 == 0) {
		leftSide.appendChild(newDiv);
	}
	else {
		rightSide.appendChild(newDiv);
	}

}
window.addEventListener('DOMContentLoaded', startSystem);
