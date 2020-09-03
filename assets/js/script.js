function lookUpCity() {
    // This capitalizes the city name.
    var cityName = ($("#cityName")[0].value.trim().toLowerCase().charAt(0).toUpperCase()) + ($("#cityName")[0].value.trim().toLowerCase().slice(1));
    var currentDate = moment().format('L');

    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                $("#city-name")[0].textContent = cityName + " (" + currentDate + ")";

                var latitude = data.coord.lat;
                var longitude = data.coord.lon;
                apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";

                fetch(apiURL).then(function (newResponse) {
                    if (newResponse.ok) {
                        newResponse.json().then(function (newData) {
                            getWeather(newData);
                        })
                    }
                })
            })
        } else {
            alert("Cannot find city!");
        }
    })
}

function getWeather(data) {
    console.log(data);
    $("#temperature")[0].textContent = "Temperature: " + data.current.temp + " \u2109";
    $("#humidity")[0].textContent = "Humidity: " + data.current.humidity + "% ";
    $("#wind-speed")[0].textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
    $("#uv-index")[0].textContent = "UV Index: " + data.current.uvi;
}

$("#search-button").on("click", function (e) {
    e.preventDefault();

    lookUpCity();
})