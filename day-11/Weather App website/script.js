const apiKey = "b6b89742bc15536bd9cb3485e1a1dc20";

let unit = "metric";
let currentCity = "";

async function getWeather(cityParam) {

  const city =
    cityParam ||
    document.getElementById("cityInput").value;

  currentCity = city;

  if (!city) return;

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod != 200) {
    alert("City not found");
    return;
  }

  document.getElementById("cityName").innerText =
    data.name;

  document.getElementById("temp").innerText =
    Math.round(data.main.temp) +
    (unit === "metric" ? "°C" : "°F");

  document.getElementById("desc").innerText =
    data.weather[0].description;

  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  getForecast(city);
}


// Forecast
async function getForecast(city) {

  const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  const forecastDiv =
    document.getElementById("forecast");

  forecastDiv.innerHTML = "";

  for (let i = 0; i < 5; i++) {

    const item = data.list[i * 8];

    forecastDiv.innerHTML += `
      <div class="day">
        <p>${new Date(item.dt_txt).getDate()}</p>

        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png"/>

        <p>
          ${Math.round(item.main.temp)}
          ${unit === "metric" ? "°C" : "°F"}
        </p>
      </div>
    `;
  }
}


// Toggle Unit
function setUnit(type) {

  if (unit === type) return;

  unit = type;

  if (currentCity) {
    getWeather(currentCity);
  }
}


// Default city
getWeather("Delhi");