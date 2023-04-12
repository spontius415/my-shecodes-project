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

function displayForecast(response) {
  console.log(response.data);
}

//Show City with APIs
function getForecast(coordinates) {
  let apiKey = "8a9574f8e3f4oafb5b3f19f0e1ee0f1t";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = (fahrTemperature * 5) / 9 - 32;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrTemp(event) {
  event.preventDefault();
  fahrLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#cels");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrLink = document.querySelector("#fahr");
fahrLink.addEventListener("click", displayFahrTemp);
