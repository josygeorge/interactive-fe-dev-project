$(document).ready(function () {
    /* ---------------------------------------------------------
        1. ---- HIDE 2 elements -------
        hide info section / footer (this is for showing loading)
    ---------------------------------------------------------- */
    $('#w-info-section, #w-footer').hide();

    // 2. -----Populating countries from json of (countries.js) file
    var countries = cData[0].countries;
    var option = '';
    for (var i = 0; i < countries.length; i++) {
        option += '<option value="' + countries[i].Code + '">' + countries[i].Name + '</option>';
    }
    // populating to dropdown /select box
    $('#countries-dropdown').append(option);

    // API - Vendor - https://api.openweathermap.org - API KEY
    var API_KEY = 'c5092302f0f7bd470d36351ce8a0f211';

    /* -------------------------------------------------------------------------
        3. ---- On window loading ----
        load the 7-day forecast of the current location based on 'lat' and 'lon'
    --------------------------------------------------------------------------- */
    if (navigator.geolocation) {
        $('#w-info-section-loader').show();
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = position;
            // console.log(currentPosition);
            //  Set 'lat' and 'lon'
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;
            // console.log(latitude + ':' + longitude);
            var url_lat_lon = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
            // calling function by passing the url as argument
            displayWeather(url_lat_lon);
            $('#w-info-section-loader').hide();
        });
    }

    /* ----------------------------------------------------------------------
        4. ----- On city search and button click load the searched data -----
        // search location / city
    ---------------------------------------------------------------------- */
    $(document).on('click', '#searchButton', function (e) {
        e.preventDefault();
        $('#w-status-loader').show();
        $('#w-status-loader').html('STATUS: Loading...');

        // Get the input value
        var searchCityElement = document.getElementById("searchByCity");
        // Testing
        // console.log("You clicked the element: " + searchCity.value);

        searchCity = searchCityElement.value;
        // get the country event of Select dropdown
        var selectEvent = document.getElementById("countries-dropdown");
        var selectedCountry = selectEvent.value;
        // if country selected, append it to searchCity and pass to the api url
        if (selectedCountry != 0) {
            searchCity = searchCity + ', ' + selectedCountry;
        }
        // API call
        var url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${searchCity}`;
        // calling function by passing the url as argument
        displayWeather(url);
    });

    /* ----------------------------------------------------------
        CALLED FUNCTION: this function will fetch the api and 
        calculate and arrange the objects to display the output
    ----------------------------------------------------------- */
    function displayWeather(url) {
        $.getJSON(url, function (response) {
            // JSON.stringify turns a Javascript object into
            // JSON text and stores that JSON text in a string.
            response = JSON.stringify(response);
            // JSON.parse turns a string of JSON text into a Javascript object.
            var data = JSON.parse(response);
            //console.log(data);
            // destructuring data
            var country = data.sys.country;
            var city = data.name;
            // finding country name by comparing it's code
            var fullCountryName = '';
            for (var x = 0; x < countries.length; x++) {
                if (countries[x].Code == country) {
                    fullCountryName = countries[x].Name;
                }
            }

            // Date Calculation from Unix Time
            var d = new Date((data.dt + data.timezone) * 1000 + (4 * 60 * 60 * 1000)); // add 4 hours in millisecs to match GMT timezone
            var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var day = days[d.getDay()];
            var hours = (d.getHours() < 10 ? '0' : '') + d.getHours();
            var mins = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
            var dateOfTheMonth = (d.getDate() < 10 ? '0' : '') + d.getDate();
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var nameOfTheMonth = months[d.getMonth()];
            //  temperature
            var temperature_celsius = (data.main.temp - 273.15).toFixed(1);
            var weather_main = data.weather[0].main;
            var weather_description = data.weather[0].description;
            var weather_icon = data.weather[0].icon;
            var dayOrNight = (weather_icon.charAt(2) == 'd' ? 'Daylight' : 'Night');

            var weather_icon_img = `<img id="image" src="https://openweathermap.org/img/wn/${weather_icon}@2x.png" alt="No image loaded"/>`;
            var feels_like = (data.main.feels_like - 273.15).toFixed(1);
            var temp_max = (data.main.temp_max - 273.15).toFixed(1);
            var temp_min = (data.main.temp_min - 273.15).toFixed(1);
            var humidity = data.main.humidity; // measured in '%'
            var pressure = data.main.pressure; // measured in 'hPa'
            var temperature_fahrenheit = ((temperature_celsius * (9 / 5)) + 32).toFixed(1);
            var visibility = (data.visibility / 1000).toFixed(1);
            // wind calculation - deg to compass AND meter/sec to kmph
            var wind_deg_to_compass = `'${degToCompass(data.wind.deg)}'`;
            var wind_speed_kmph = (data.wind.speed * 3.6).toFixed(1);
            var wind = `${wind_deg_to_compass} ${wind_speed_kmph} km/h`;

            // display all hided elements, once the document is loaded and ready
            $('#w-info-section, #w-footer').show();
            // display city and full country name
            $("#w-status-loader").css("color", "rgb(35, 211, 124)");
            $('#w-status-loader').html(city + ', ' + fullCountryName);
            // DISPLAY logic in HTML
            $('#w-info1').html(city);
            $('#w-info1-1').html(day + ' ' + nameOfTheMonth + ' ' + dateOfTheMonth + ', ' + hours + ':' + mins);
            $('#w-info1-2').html(dayOrNight + ' w/ ' + weather_description);

            $('#w-info2-1').html(weather_main + ', Feels like ' + feels_like + '&#8451');
            $('#w-info2').html(weather_icon_img + temperature_celsius + '℃');

            $('#w-info2-1-1').html('H: ' + temp_max + '&#8451');
            $('#w-info2-1-2').html('L: ' + temp_min + '&#8451');

            $('#w-info3-1').html('Wind: ' + wind);
            $('#w-info3-2').html('Visibility: ' + visibility + ' km');
            $('#w-info3-3').html('Pressure: ' + pressure + ' hPa');
            $('#w-info3-4').html('Humidity: ' + humidity + '%');
            $('.w-info-line').show();
            // Function to toggle b/w Celsius to Fahrenheit
            $('#w-info2').off().on("click", function () {
                if (document.getElementById("w-info2").textContent == (temperature_celsius + '℃')) {
                    $('#w-info2').html(weather_icon_img + temperature_fahrenheit + '\xB0F');
                    return false;
                }
                else {
                    $('#w-info2').html(weather_icon_img + temperature_celsius + '℃');
                    return false;
                }
            });

            // Condition to display bg gradient color based on night and day
            if (dayOrNight == 'Night') {
                $('.weather-info, body').css({
                    background: "linear-gradient(145deg, #131862, #546bab)"
                });
            } else {
                $('.weather-info, body').css({
                    background: "linear-gradient(145deg, #0d47a1, #3394e4)"
                });
            }
        }) // getJSON fails
            .fail(function (error) {
                // json.error occured
                var error_msg = 'STATUS: Error! Please try again.';
                $('#w-status-loader').html(error_msg);
                $("#w-status-loader").css("color", "rgb(255, 194, 0)");
            });
        $('#searchByCity').val(''); // clearing the input value
        $('#countries-dropdown').val(0); // resetting the select value
    }
    function degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
}); // $(document).ready() ENDS
