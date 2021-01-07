var citySearch = $("#city-search");
var cityHistory = $(".city-history");
var cityArr = [];
var cityName = $("#city-name");
var dateToday = $("#date");
var weatherToday = $("#weather-today")
var cityTemp = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
var UVIndex = $("#uv-index");
var futureWeather = $("#future-weather")



// search bar
$("#submit-button").on("click", function(event) {
    event.preventDefault();

    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + citySearch.val() + "&units=imperial&appid=3d8a9db33d6081c4a896f43ab9165e4d"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(queryURL);
        addHistory(citySearch.val())
        showWeatherToday(response)
        weatherWeek(response)
    });
    
});

function addHistory(cityToSave) {
    cityArr.push(cityToSave)
    localStorage.setItem("cityHistory", JSON.stringify(cityArr))
    showHistory()
}

function showHistory() {
    cityList = JSON.parse(localStorage.getItem("cityHistory"))
    // search for , and make a new card for each ,
    for (i = 0; i < cityList.length; i++) {
        var card = $("<div>")
        card.addClass("card")
        cityHistory.append(card)
        var cardBody = $("<div>")
        cardBody.addClass("card-body")
        card.append(cardBody)
        var p = $("<h6>")
        p.text(cityList[i])
        cardBody.append(p)
    }
}

function showWeatherToday(response) {
    cityName.text(response.city.name)
    dateToday.text(response.list[0].dt_txt)
    weatherToday.attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
    cityTemp.text("Temperature: " + response.list[0].main.temp + "° F")
    humidity.text("Humidity: " + response.list[0].main.humidity + "%")
    windSpeed.text("Windspeed: " + response.list[0].wind.speed + "MPH")
    UVIndex.text(response.list[0].dt_txt)
}

function weatherWeek(response) {
    for (i = 1; i < 5; i++){
        var p = $("<p>")
        var img = $("<img>")
        p.text(response.list[i].dt_txt)
        

    }
    
}

showHistory()

// container2
//         display city name, date and picture of weather
//         temp
//         humidity
//         windspeed
//         UV index with changing color background depending on how high UV Index is
//         5 day forecast
//             date and pic of weather
//             temp
//             humidity