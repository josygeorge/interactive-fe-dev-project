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
        // Loading started - showing the spinner and msg 
        $('#w-info-section-loader').show();
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = position;
            //  Set 'lat' and 'lon'
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;
            // calling function by passing the coords as argument
            getCityHandler(latitude, longitude);
        });
    }
    /* ----------------------------------------------------
        Called function 
        - a. for getting the city for displaying the city and the country.
        - b. passing all the arguments, to the main function - displayForecast()
    ----------------------------------------------------- */
    function getCityHandler(latitude, longitude) {
        var url_lat_lon = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        $.getJSON(url_lat_lon, function (response) {
            // JSON.stringify turns a Javascript object into
            // JSON text and stores that JSON text in a string.
            response = JSON.stringify(response);
            // JSON.parse turns a string of JSON text into a Javascript object.
            var data = JSON.parse(response);
            // destructuring data
            var countryCode = data.sys.country;
            var city = data.name;
            // API data call for fetching weekly forecast
            var urlUsingCoord = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`;
            displayForecast(urlUsingCoord, city, countryCode);
            // Loading ends - hiding the spinner and msg
            $('#w-info-section-loader').hide();
        })// getJSON fails
            .fail(function (error) {
                console.log(error);
                // json.error occured
                var error_msg = 'STATUS: Error! Please try again.';
                $('#w-status-loader').html(error_msg);
                $("#w-status-loader").css("color", "rgb(255, 194, 0)");

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
        /* ----------------------------------------------------------------
        first call this function to get coord data on city value. 
        Then, from that function, using the fetched arguments, call the main function - displayForecast()
        ----------------------------------------------------------------- */
        getCoordOnCityValue(url);
    });
    function getCoordOnCityValue(url) {
        $.getJSON(url, function (response) {
            // JSON.stringify turns a Javascript object into JSON text and stores that JSON text in a string.
            response = JSON.stringify(response);
            // JSON.parse turns a string of JSON text into a Javascript object.
            var data = JSON.parse(response);
            var searchCity = data.name;
            var countryCode = data.sys.country;
            // destructuring data
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
            var urlUsingCoord = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`;
            // calling function by passing the url as argument
            displayForecast(urlUsingCoord, searchCity, countryCode);
        })// getJSON fails
            .fail(function (error) {
                console.log(error);
                // json.error occured
                var error_msg = 'STATUS: Error! Please try again.';
                $('#w-status-loader').html(error_msg);
                $("#w-status-loader").css("color", "rgb(255, 194, 0)");

            });
    }

    /* --------------------------------------------------------------
        MAIN function - receiving URL, city, countrycode as arguments
    ---------------------------------------------------------------- */
    function displayForecast(urlUsingCoord, city, countryCode) {
        // fetching data for forecast details
        $.getJSON(urlUsingCoord, function (response) {
            // JSON.stringify turns a Javascript object into JSON text and stores that JSON text in a string.
            response = JSON.stringify(response);
            // JSON.parse turns a string of JSON text into a Javascript object.
            var data = JSON.parse(response);
            var table = '';
            for (var i = 1; i < data.daily.length; i++) {
                // destucturing data
                // Date Calculation from Unix Time
                var d = new Date((data.daily[i].dt + data.timezone_offset) * 1000 + (4 * 60 * 60 * 1000)); // add 4 hours in millisecs to match GMT timezone
                var dateOfTheMonth = (d.getDate() < 10 ? '0' : '') + d.getDate();
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                var nameOfTheMonth = months[d.getMonth()];
                var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                var day = days[d.getDay()];
                //  temperature conversion from kelvin to celsius
                var max_temperature = (data.daily[i].temp.max - 273.15).toFixed(0);
                var min_temperature = (data.daily[i].temp.min - 273.15).toFixed(0);
                var image_icon = `<img width="45px" height="40px" src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">`;
                // creating tr elements for the table
                table += `<tr>`;

                table += `<td class="pl-3">${day}, ${nameOfTheMonth} ${dateOfTheMonth}</td>`;
                table += `<td>${max_temperature}&deg;C</td>`;
                table += `<td>${min_temperature}&deg;C</td>`;
                table += `<td class="mt-0 pt-0 pr-3">${image_icon} ${data.daily[i].weather[0].description}</td>`;

                table += `</tr>`;
            }
            $("#forecastWeather").html(table);
            // display all hided elements, once the document is loaded and ready
            $('#w-info-section, #w-footer').show();

            // finding country name by comparing it's code
            var fullCountryName = '';
            for (var x = 0; x < countries.length; x++) {
                if (countries[x].Code == countryCode) {
                    fullCountryName = countries[x].Name;
                }
            }
            // display city and full country name
            $("#w-status-loader").css("color", "rgb(35, 211, 124)");
            $('#w-status-loader').html(city + ', ' + fullCountryName);
        })// getJSON fails
            .fail(function (error) {
                console.log(error);
                // json.error occured
                var error_msg = 'STATUS: Error! Please try again.';
                $('#w-status-loader').html(error_msg);
                $("#w-status-loader").css("color", "rgb(255, 194, 0)");

            });
        $('#searchByCity').val(''); // clearing the input value
        $('#countries-dropdown').val(0); // resetting the select value
    }
}); // $(document).ready() ENDS