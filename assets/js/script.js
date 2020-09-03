function lookUpCity() {
    // This capitalizes the city name.
    var cityName = ($("#cityName")[0].value.trim().toLowerCase().charAt(0).toUpperCase()) + ($("#cityName")[0].value.trim().toLowerCase().slice(1));
    var currentDate = moment().format('L');

    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);


                var displayCity = cityName + " (" + currentDate + ")";
                $("#city-name")[0].textContent = displayCity;

                var latitude = data.coord.lat;
                var longitude = data.coord.lon;

                console.log(latitude);
                getWeather(data);
            })
        } else {
            alert("Cannot find city!");
        }
    })
}

function getWeather(data) {
    // $("#temperature")[0].textContent = data.main.temp;
    // $("#humidity")[0].textContent = data.main.humidity;
    // $("#wind-speed")[0].textContent = data.wind.speed;
    // $("#uv-index")[0].textContent = data.main.temp;
}

$("#search-button").on("click", function (e) {
    e.preventDefault();

    lookUpCity();
})