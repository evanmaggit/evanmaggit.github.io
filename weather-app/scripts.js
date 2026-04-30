/* javascript to enable drag-scrolling */

const weatherUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json?days=3&q=';

const weatherOptions = {

	method: 'GET',

	headers: {

		'x-rapidapi-key': 'b1191f052bmsh9393381bd6d8022p103498jsna1764183a67a',

		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',

		'Content-Type': 'application/json'

	}

};

// preparing variables

let scrollingBox;

let offsetLeftStart;

let scrollLeftStart;

let isMoving;


// function to get remote JSON data

async function getData(url, options) {

    try {

        const response = await fetch(url, options);

        if (response.ok) {

            const result = await response.json();

            return result;

        } else {

            throw (response.status);

        }

    } catch (error) {

        console.error(error);

    }

}

// update weather display in the DOM based on passed object

function updateWeather(weatherObject) {

    console.log(weatherObject);

    document.querySelector("#currentTemp span").innerHTML = weatherObject.current.temp_f;

    document.querySelector("#currentStatus").innerHTML = weatherObject.current.condition.text;

    document.querySelector("#currentHumidity span").innerHTML = weatherObject.current.humidity;

    // output wind speed and direction in a combined string

    let windspeed = weatherObject.current.wind_mph;

    let winddirection = weatherObject.current.wind_dir;

    document.querySelector("#currentWind").innerHTML = windspeed + "mph " + winddirection;


    let futureDays = document.querySelectorAll(".futureDay");

    for (i = 0; i < futureDays.length; i++) {

        futureDays[i].querySelector(".futureTemp span").innerHTML = weatherObject.forecast.forecastday[i].day.maxtemp_f;

        windspeed = weatherObject.forecast.forecastday[i].day.maxwind_mph;

        futureDays[i].querySelector(".futureWind").innerHTML = windspeed + "mph ";

        futureDays[i].querySelector(".futureStatus").innerHTML = weatherObject.forecast.forecastday[i].day.condition.text;

    }

}

// wait for DOM to load

document.addEventListener("DOMContentLoaded", function () {

    scrollingBox = document.querySelector("#futureInfo"); /* get a handle on the parent container by tag or ID */

    isMoving = false;

    scrollingBox.addEventListener("mousedown", function (e) {

        scrollLeftStart = scrollingBox.scrollLeft;

        offsetLeftStart = e.pageX - scrollingBox.offsetLeft;

        isMoving = true;

    });

    scrollingBox.addEventListener("mouseleave", function (e) {

        isMoving = false;

    });

    scrollingBox.addEventListener("mouseup", function (e) {

        isMoving = false;

    });

    scrollingBox.addEventListener("mousemove", function (e) {

        e.preventDefault();

        if (!isMoving) return;

        scrollingBox.scrollLeft = scrollLeftStart - (e.pageX - offsetLeftStart - scrollingBox.offsetLeft);

    });

    let ipLookupURL = "https://api.ipify.org/?format=json";

    let ipLookupOptios = {};

    getData(ipLookupURL, ipLookupOptios).then(function(result) {

        let weatherLookupURL = weatherUrl + result.ip;

        console.log(weatherLookupURL);

        getData(weatherLookupURL, weatherOptions).then(function(weatherResult){

            console.log(weatherResult);

            updateWeather(weatherResult);

        });

    });

    document.querySelector("#findLocation").addEventListener("click", function(){

        document.body.classList.toggle("showModal");

    });

    document.querySelector("#locationForm").addEventListener("submit", function(event){

	    event.preventDefault();

        document.body.classList.toggle("showModal");

        let newLocation = document.querySelector("#locationBox").value;

        let weatherLookupURL = weatherUrl + newLocation;

        console.log(weatherLookupURL);

        getData(weatherLookupURL, weatherOptions).then(function(weatherResult){

            console.log(weatherResult);

            updateWeather(weatherResult);
            
        });

    });

});