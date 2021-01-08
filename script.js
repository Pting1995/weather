var citySearch = $("#city-search");
var cityHistory = $(".city-history");
var cityArr = [];
var cityName = $("#city-name");
var dateToday = $("#date");
var weatherToday = $("#weather-today");
var cityTemp = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
var UVIndex = $("#UVIndex");
var futureWeather = $("#future-weather");
var mainCol = $(".main-column");

// search bar
$("#submit-button").on("click", function(event) {
    search(event);
});


function search(event) {
    event.preventDefault();
    
    document.querySelector(".main-column").hidden = false;

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch.val() + "&units=imperial&appid=3d8a9db33d6081c4a896f43ab9165e4d"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(queryURL);
        addHistory(citySearch.val());
        showWeatherToday(response);
        weatherWeek(response);
        UVIndex.removeClass("safe beware danger")
    });
}

// adds submitted cities to local storage
function addHistory(cityToSave) {
    cityArr.push(cityToSave);
    localStorage.setItem("cityHistory", JSON.stringify(cityArr));
    showHistory();
}

// shows search history
function showHistory() {
    var cityList = JSON.parse(localStorage.getItem("cityHistory"))
    // search for , and make a new card for each ,
    var div = $("<div>")
    var button = $("<button>")
    button.addClass("btn history-btn btn-outline-primary")
    button.text(cityList[cityList.length - 1]);
    div.append(button)
    $(".city-storage").prepend(div);
    // citySearch.val("")
}

$(".history-btn").on("click", function(event) {
    event.preventDefault();
    search(event);
    // citySearch.text($(this).text())
    // citySearch = input box
})

// shows todays weather
function showWeatherToday(response) {
    cityName.text(response.city.name);
    dateToday.text(response.list[0].dt_txt);
    weatherToday.attr("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
    cityTemp.text("Temperature: " + response.list[0].main.temp + "° F");
    humidity.text("Humidity: " + response.list[0].main.humidity + "%");
    windSpeed.text("Windspeed: " + response.list[0].wind.speed + "MPH");
    var lat = response.city.coord.lat
    var lon = response.city.coord.lon
    console.log(lat)
    console.log(lon)
    var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=3d8a9db33d6081c4a896f43ab9165e4d"

    $.ajax({
        url: UVqueryURL,
        method: "GET"
    }).then(function(responseUV) {
        UVIndex.text("UV Index: " + responseUV.value)
        if (responseUV.value < 2) {
            UVIndex.addClass("safe")
        }
        else if (responseUV.value < 5) {
            UVIndex.addClass("beware")
        }
        else {
            UVIndex.addClass("danger")
        }

        console.log(responseUV)
    });
}

// shows 5 day forecast
function weatherWeek(response) {
    var j = 0
    for (i = 7; i <= 39; i = i + 8){
        j++
        // date
        $("#forecast-date" + j).text(response.list[i].dt_txt);
        // weather icon
        $("#forecast-img" + j).attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
        // // temp
        $("#forecast-temp" + j).text("Temp: " + response.list[i].main.temp + "° F");
        // humidity
        $("#forecast-humidity" + j).text("Humidity: " + response.list[i].main.humidity + "%");
    }
}