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

//Show City with APIs
function getForecast(coordinates) {
  let apiKey = "8a9574f8e3f4oafb5b3f19f0e1ee0f1t";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humid");
  let precipitationElement = document.querySelector("#precip");
  let windElement = document.querySelector("#wind");
  let dateUpdate = document.querySelector("#today-date");
  let iconUpdate = document.querySelector("#icon");

  fahrTemperature = response.data.main.temp;

  document.querySelector("#city-name").innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(fahrTemperature);
  humidityElement.innerHTML = response.data.main.humid;
  descriptionElement.innerHTML = response.data.weather[0].description;
  precipitationElement.innerHTML = response.data.main.precipitation;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateUpdate.innerHTML = formatDate(response.data.dt * 1000);
  iconUpdate.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.weather[0].icon}.png`
  );
  iconUpdate.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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
