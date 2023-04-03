// the auto-resizible input bar
function autoresize() {
  let size = input.scrollWidth;
  input.style.width = size + "px";
  input.style.transition = "none";
}

let input = document.getElementById("city-input");
input.addEventListener("input", autoresize);

// Display the date
function getCurFullDate() {
  const curDate = document.querySelector("#date");
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const curFullDate = `${days[now.getDay()]}, ${now.getHours()}:${
    (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
  }`;
  curDate.textContent = curFullDate;
}

// Display the weather
function currentWeather(response) {
  let city = document.querySelector("#city-input");
  city.value = response.data.name;

  let currentTemp = document.querySelector("#temperature");
  let currentTempCel = response.data.main.temp;
  currentTemp.textContent = `${Math.round(currentTempCel)}`;

  let weatherDescr = document.querySelector("#weather-description");
  let weatherMessage = `${response.data.weather[0].main.toLowerCase()}`;
  weatherDescr.textContent = weatherMessage;

  let hum = document.querySelector("#humidity");
  hum.textContent = `💧 ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind-speed");
  wind.textContent = ` 🌬 ${response.data.wind.speed} km/h`;

  getCurFullDate();
}

document.querySelector("#city-input").addEventListener("keydown", function (e) {
  if (13 == e.keyCode) {
    let searchInput = document.querySelector("#city-input");
    let keyApi = "203fa770242fcd2b9555d832a88ea567";
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${keyApi}&units=metric`;
    axios.get(urlApi).then(currentWeather);
  }
});

// Start with the date and location
getCurFullDate();
let keyApi = "203fa770242fcd2b9555d832a88ea567";
let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=Ramsdorf&appid=${keyApi}&units=metric`;
axios.get(urlApi).then(currentWeather);

//Reset to local weather
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let keyApi = "b400ae3b711a616262d18b0ca2cbe78f";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=metric`;
  axios.get(urlApi).then(currentWeather);
}

function showCurCity() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", showCurCity);

//Change the metrics
let cels = document.querySelector("#celsius-link");
let fahr = document.querySelector("#fahrenheit-link");

function changeMetric(response) {
  let currentTemp = document.querySelector("#temperature");
  let currentTempDegree = response.data.main.temp;
  currentTemp.textContent = `${Math.round(currentTempDegree)}`;
}

function toCels() {
  let units = "metric";
  let city = document.querySelector("#city-input");
  let keyApi = "b400ae3b711a616262d18b0ca2cbe78f";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${keyApi}&units=${units}`;
  axios.get(urlApi).then(changeMetric);
  /*let degree = document.querySelector("#temperature");
        let comp = (Number(degree.textContent) - 32) / 1.8;
        degree.textContent = Math.round(comp);*/
}
function toFahr() {
  let units = "imperial";
  let city = document.querySelector("#city-input");
  let keyApi = "b400ae3b711a616262d18b0ca2cbe78f";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${keyApi}&units=${units}`;
  axios.get(urlApi).then(changeMetric);
  /*let degree = document.querySelector("#temperature");
        let comp = degree.textContent * 1.8 + 32;
        degree.textContent = Math.round(comp);*/
}
fahr.addEventListener("click", toFahr);
cels.addEventListener("click", toCels);
