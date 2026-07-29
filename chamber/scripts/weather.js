// weather.js — current weather and 3-day forecast (index.html only)
// API: OpenWeatherMap | Location: Guayaquil, Ecuador

const apiKey = "8eb77f2ec95bf6a80f335ff5413485de";
const lat = -2.170998;
const lon = -79.922359;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function getCurrentWeather() {
  try {
    const response = await fetch(currentUrl);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    document.querySelector("#temperature").textContent = `${Math.round(data.main.temp)}\u00B0C`;
    document.querySelector("#description").textContent = data.weather[0].description;
    document.querySelector("#humidity").textContent = `Humidity: ${data.main.humidity}%`;
  } catch (error) {
    console.error("Error loading current weather:", error);
    document.querySelector("#description").textContent = "Weather unavailable";
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    const forecastList = document.querySelector("#forecast-list");
    forecastList.innerHTML = "";

    // The API returns data every 3 hours, so 8 entries equal one day
    for (let i = 8; i <= 24; i += 8) {
      const day = data.list[i];
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const temp = Math.round(day.main.temp);

      const li = document.createElement("li");
      li.innerHTML = `<strong>${dayName}:</strong> ${temp}\u00B0C`;
      forecastList.appendChild(li);
    }
  } catch (error) {
    console.error("Error loading forecast:", error);
  }
}

getCurrentWeather();
getForecast();
