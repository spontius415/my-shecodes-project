//show current date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
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

  let currentDay = days[date.getDay()];
  return `${currentDay} ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `"<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
                  <div class="WeatherForecastPreview">
                    <div class="forecast-time">${formatDay(
                      forecastDay.time
                    )}</div>
                    <img src="${forecastDay.condition.icon_url}"/>
                    <div class="forecast-temperature">
                      <span class="forecast-temperature-max">${Math.round(
                        forecastDay.temperature.maximum
                      )}°</span>
                      <span class="forecast-temperature-min">${Math.round(
                        forecastDay.temperature.minimum
                      )}°</span>
                    </div>
                  </div>
                </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;

  console.log(forecastHTML);
}

//Show City with APIs

let fahrTemperature = null;
function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let dateUpdate = document.querySelector("#today-date");
  let iconUpdate = document.querySelector("#icon");

  fahrTemperature = response.data.temperature.current;

  document.querySelector("#city-name").innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(fahrTemperature);
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateUpdate.innerHTML = formatDate(response.data.time * 1000);
  iconUpdate.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconUpdate.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function getForecast(coordinates) {
  let apiKey = "8a9574f8e3f4oafb5b3f19f0e1ee0f1t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "8a9574f8e3f4oafb5b3f19f0e1ee0f1t";
  let units = "imperial";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);
