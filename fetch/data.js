var topDiv = document.getElementById("container");
var weather = {description:"", temperatureC:0,};
var weatherDisplay = document.getElementById("weatherDisplay");

function start(){

	var geoLocation = getLocation();
	hideWelcomeDiv();
	geoLocation.getCurrentPosition(buildLocalWeatherDiv);

}

function hideWelcomeDiv(){
	var welcomeDiv = document.getElementById("welcome");
	welcomeDiv.style.display = 'none';
}

function getLocation(){
	if (navigator.geolocation) {
		var goodGeoFeedback = "working on your position...";
    } else { 
        topDiv.innerHTML = "without your location that's not possible!";
    }

    return navigator.geolocation;
}

function buildLocalWeatherDiv(position){

	// CALL API
   	getWeatherFromAPI(position);

    var weatherHTML = "<div id=\"weatherIcon\"></div>"+"<div id=\"weatherReport\"></div>"+"<div id=\"degreesReport\"></div>";
    weatherHTML += "<div id=\"degreeContainer\"></div>";

    weatherDisplay.innerHTML = weatherHTML;

    setWeatherIcon();

    showCelsius();  

}


function getWeatherFromAPI(position){


    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;




    var xhr = new XMLHttpRequest();
	
    var apiCall = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&&appid=9d06d9b4825f10f79591ff063769f070";

    xhr.open("GET", apiCall, false);
    xhr.send();

 
	// create object from JSON
	let jsObj = JSON.parse(xhr.response);

	// extract useful information
	weather.description = jsObj.weather[0].main;
    let tempCelsius = jsObj.main.temp;
    weather.temperatureC = tempCelsius.toFixed(1);
   
}

function setWeatherIcon(){

	var weatherIcon = document.getElementById("weatherIcon");
	var weatherReport = document.getElementById("weatherReport");

	// html resources

	var res = {
		clear:"<div><img id=\"weather-icon\" src=\"https://i.postimg.cc/QMRLGCTX/sun.png\"/></div>",
		rain:"<div><img id=\"weather-icon\" src=\"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_6-512.png\"/></div>",
		snow:"<div><img id=\"weather-icon\" src=\"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_35-512.png\"/></div>",
		clouds:"<div><img id=\"weather-icon\" src=\"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_39-512.png\"/></div>",
		thunder:"<div><img id=\"weather-icon\" src=\"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_23-512.png\"/></div>",
		fog:"<div><img id=\"weather-icon\" src=\"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_30-512.png\"/></div>"};

	// weather icons in if else statements

	if(weatherIcon.innerHTML = res.clear){
                weatherReport.innerHTML = "<p>A clear sky!</p>";
        }
	else if(weatherIcon.innerHTML = res.rain){
			weatherReport.innerHTML = "<p>It's rainy outside :/ </p>";
	}
else if(weatherIcon.innerHTML = res.snow){
    weatherReport.innerHTML = "<p>Snow!</p>";
}
else if(weatherIcon.innerHTML = res.clouds){
    weatherReport.innerHTML = "<p>Meh, clouds.</p>";  
}
else{
    weatherIcon.innerHTML = "<img src='http://welp.im/welp.gif' /><p>We don't know that kind of weather</p>";
};

function showDegrees(unit){
	var degreesReport = document.getElementById("degreesReport");
	if (unit === "C") {
		degreesReport.innerHTML = "<p>" + "at " + weather.temperatureC + " °C</p>"
	}
    else{
        `<p>something went wrong dawg</p>`
    }
}
showDegrees("C");
var degreeContainer = document.getElementById("degreeContainer");
degreeContainer.innerHTML = "<button id=\"showFahrenheitButton\" onclick=\"showFahrenheit()\">in °F</button>";
}