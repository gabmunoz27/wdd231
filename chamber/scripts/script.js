
document.getElementById("lastModified").textContent = document.lastModified;


const apiKey = "8eb77f2ec95bf6a80f335ff5413485de"; // API
const lat = -2.170998;  // Guayaquil
const lon = -79.922359;
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

async function getWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const current = data.list[0];
    document.getElementById("temperature").textContent = `🌡️ ${current.main.temp}°C`;
    document.getElementById("description").textContent = current.weather[0].description;
    document.getElementById("humidity").textContent = `Humedad: ${current.main.humidity}%`;

    const forecastList = document.getElementById("forecast-list");
    forecastList.innerHTML = "";

    for (let i = 8; i < 32; i += 8) { // 3 días siguientes
      const day = data.list[i];
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("es-EC", { weekday: "long" });
      const temp = Math.round(day.main.temp);
      forecastList.innerHTML += `<li>${dayName}: ${temp}°C</li>`;
    }
  } catch (error) {
    console.error("Error al obtener el clima:", error);
  }
}

// --- SPOTLIGHTS 
async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  
 
  const filtered = members.filter(member => 
    member.membership === "Gold" || member.membership === "Silver"
  );


  const shuffled = filtered.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  displaySpotlights(selected);
}

function displaySpotlights(members) {
  const spotlights = document.querySelectorAll(".spotlight");
  members.forEach((member, index) => {
    if (spotlights[index]) {
      spotlights[index].innerHTML = `
        <img src="${member.image}" alt="Logo de ${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>📞 ${member.phone}</p>
        <a href="${member.website}" target="_blank">Visitar sitio web</a>
        <p class="membership">${member.membership} Member</p>
      `;
    }
  });
}


getWeather();
getMembers();
