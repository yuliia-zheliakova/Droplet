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

// Changing icons with Shecodes API
function changeIcon(response) {
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.icon);
}

// Display the weather forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML += `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/04d@2x.png"
                  alt=""
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">18°</span>
                  <span class="weather-forecast-temp-min">12°</span>
                </div>
              </div>
  `;
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Get the forecast date
function getForecast(coordinates) {
  let keyApi = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${keyApi}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  hum.textContent = `☔️ ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind-speed");
  wind.textContent = ` 💨 ${response.data.wind.speed} km/h`;

  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  //let iconApiKey = "e10347bca54258b03todcf0244c0fb2a";
  //let iconUrlApi = `https://api.shecodes.io/weather/v1/current?query=${response.data.name}&key=${iconApiKey}`;
  //axios.get(iconUrlApi).then(changeIcon);
  getCurFullDate();
  getForecast(response.data.coord);
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
