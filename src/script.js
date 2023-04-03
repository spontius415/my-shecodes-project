//show current date
let currentTime = new Date();

function formatDate(date) {
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
  let currentHour = date.getHours();
  if ((currentHour, 10)) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let formattedDate = `${currentDay} ${currentHour}:${currentMinute}`;

  return formattedDate;
}

console.log(formatDate(currentTime));

let dateUpdate = document.querySelector("#today-date");
dateUpdate.innerHTML = currentTime;

//Show City with APIs
function search(city) {
  let apiKey = "1a8a00a0d298494828889a5f4e560ba8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
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
