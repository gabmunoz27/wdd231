// weather.js — clima actual y pronóstico de 3 días (solo index.html)
// API: OpenWeatherMap | Ubicación: Guayaquil, Ecuador

const apiKey = "8eb77f2ec95bf6a80f335ff5413485de";
const lat = -2.170998;
const lon = -79.922359;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

async function getCurrentWeather() {
  try {
    const response = await fetch(currentUrl);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();

    document.querySelector("#temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector("#description").textContent = data.weather[0].description;
    document.querySelector("#humidity").textContent = `Humedad: ${data.main.humidity}%`;
  } catch (error) {
    console.error("Error al obtener el clima actual:", error);
    document.querySelector("#description").textContent = "Clima no disponible";
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();

    const forecastList = document.querySelector("#forecast-list");
    forecastList.innerHTML = "";

    // El API devuelve datos cada 3 horas: 8 entradas = 1 día
    for (let i = 8; i <= 24; i += 8) {
      const day = data.list[i];
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("es-EC", { weekday: "long" });
      const label = dayName.charAt(0).toUpperCase() + dayName.slice(1);
      const temp = Math.round(day.main.temp);

      const li = document.createElement("li");
      li.innerHTML = `<strong>${label}:</strong> ${temp}°C`;
      forecastList.appendChild(li);
    }
  } catch (error) {
    console.error("Error al obtener el pronóstico:", error);
  }
}

getCurrentWeather();
getForecast();
