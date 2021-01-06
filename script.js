var cityName = $("#city-name");
var cityHistory = $(".city-history")
var cityArr = []

$("#submit-button").on("click", function(event) {
    event.preventDefault();

    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + cityName.val() + "&appid=3d8a9db33d6081c4a896f43ab9165e4d";
    // var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=London&appid=3d8a9db33d6081c4a896f43ab9165e4d";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(queryURL);
        addHistory(cityName.val())
    });
    
});

function addHistory(cityToSave) {
    cityArr.push(cityToSave)
    localStorage.setItem("cityHistory", JSON.stringify(cityArr))
    cityHistory.text(JSON.parse(localStorage.getItem("cityHistory")))
}

cityHistory.text(JSON.parse(localStorage.getItem("cityHistory")))

    // var p = $("<p>")
    // p.text(localStorage.getItem("cityHistory"))
    // cityHistory.append(p)


// container1
//     search for a city
//     list cities from local storage

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