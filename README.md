# VGDC 2023

Welcome to the official github repository for Video Game Development Club at University <br> 
of California San Diego. We are a independent entity on campus that focuses on educating <br>
students all there is to video game development! 


## Set Up
To get started on dev, install the Live Server VSCode extension from the extensions panel <br>
Every change made in the IDE will be reflected on the locally hosted static website



## Dev Notes
A new section was added in Jan 2024 to preview all upcoming events from the board's personal google spreadsheet. <br>
The code is fairly straightforward and most of the logic to fetch the data is inside an embedded ```<script>``` <br> 
Each event then gets processed as a custom web component found
at ```assets/js/eventCard.js```

Our web component comes with a high degree of interactivity and the ability to schedule <br>
google calendar events. To do this, each one dispatches custom events with payload data <br>
containing the event details. The window object inside the root ```index.html``` file will listen <br>
for these custom events to handle the task of navigating the user to a new google calendar tab.


It should be noted that the image URLs pulled from the spreadsheet <br> must point to a publicly-accessible google drive photo made viewable to anyone, <br> 
otherwise the network won't be able to fetch the resource.



