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

let dateUpdate = document.querySelector("#today-date");
dateUpdate.innerHTML = formatDate(response.data.dt * 1000);

//Show City with APIs
function search(city) {
  let apiKey = "8a9574f8e3f4oafb5b3f19f0e1ee0f1t";
  let units = "imperial";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function typeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function showTemperature(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature} &#176c`;
  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humid");
  showHumidity.innerHTML = `Humidity: ${humidity}%`;
  let precipitation = response.data.main.precipitation;
  let showPrecipitation = document.querySelector("#precip");
  showPrecipitation.innerHTML = `Precipitation: ${precipitation}%`;
  let wind = Math.round(response.data.wind.speed);
  let speedWind = document.querySelector("#wind");
  speedWind.innerHTML = `wind: ${wind} m/h`;
}
