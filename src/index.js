let currentUnit;
searchCity("Hengelo");

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2 daysOfweek">
              <div class="weekDay02">${formatDay(forecastDay.dt)}</div>
             <span class="strong tempMax" id="tempMax">  ${Math.round(
               forecastDay.temp.max
             )}º </span>|  ${Math.round(forecastDay.temp.min)}º <br>
              <img
          src="src/img/${forecastDay.weather[0].icon}.png"
          alt=""
          width="42"
        /></div>
            
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "df0c7cf829e270572999fe0fa2793ff1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${currentUnit}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDate(time) {
  let date = new Date(time);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "Februry",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let currentDay = date.getDate();
  return `<div class="weekDay" id="currentDate">${day}, ${hours}:${minutes} </div> 
              <div class="dateMonth"> ${month}, ${currentDay}</div>`;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    celsiusTemperature
  )}º`;
  console.log(response.data);
  document.querySelector("#descriptionDay").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}Km/h`;
  document.querySelector("#currentDay").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#iconCurrentDay");
  iconElement.setAttribute(
    "src",
    `src/img/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "df0c7cf829e270572999fe0fa2793ff1";
  let currentUnit = getUnit();
  let apiEndPoint = "https://api.openweathermap.org/";
  let apiUrl = `${apiEndPoint}data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  searchCity(cityInputElement.value);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  currentUnit = `metric`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let city = document.querySelector("#city").innerHTML;
  searchCity(city);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();

  currentUnit = `imperial`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let city = document.querySelector("#city").innerHTML;

  searchCity(city);
}

function getUnit() {
  let unitType = document.querySelector("#celsius");
  if (unitType.className === "unitsLink active") {
    currentUnit = "metric";
  } else {
    currentUnit = "imperial";
  }
  return currentUnit;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
