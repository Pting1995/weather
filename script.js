var citySearch = $("#city-search");
var cityHistory = $(".city-history");
var cityArr = [];
var cityName = $("#city-name");
var dateToday = $("#date");
var weatherToday = $("#weather-today");
var cityTemp = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
// var UVIndex = $("#uv-index");
var futureWeather = $("#future-weather");
var mainCol = $(".main-column");

// search bar
$("#submit-button").on("click", function(event) {
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
    });
    
});

function addHistory(cityToSave) {
    cityArr.push(cityToSave);
    console.log(cityArr)
    console.log(cityToSave)
    localStorage.setItem("cityHistory", JSON.stringify(cityArr));
    showHistory();
}
// work on me
function showHistory() {
    var cityList = JSON.parse(localStorage.getItem("cityHistory"))
    // search for , and make a new card for each ,
    var button = $("<button>")
    button.attr("Type", "button")
    button.addClass("btn btn-outline-primary")
    button.attr("id", "")
    button.text(cityList[cityList.length - 1]);
    $(".city-storage").prepend(button);
    citySearch.val("")
}

function showWeatherToday(response) {
    cityName.text(response.city.name);
    dateToday.text(response.list[0].dt_txt);
    weatherToday.attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
    cityTemp.text("Temperature: " + response.list[0].main.temp + "° F");
    humidity.text("Humidity: " + response.list[0].main.humidity + "%");
    windSpeed.text("Windspeed: " + response.list[0].wind.speed + "MPH");
    // UVIndex.text(response.list[0].dt_txt)
}

function weatherWeek(response) {
    var j = 0
    for (i = 7; i <= 39; i = i + 8){
        j++
        // date
        $("#forecast-date" + j).text(response.list[i].dt_txt);
        // weather icon
        $("#forecast-img" + j).attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
        // // temp
        $("#forecast-temp" + j).text("Temp: " + response.list[i].main.temp + "° F");
        // humidity
        $("#forecast-humidity" + j).text("Humidity: " + response.list[i].main.humidity + "%");
    }
}