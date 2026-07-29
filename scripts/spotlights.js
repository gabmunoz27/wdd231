// spotlights.js — miembros destacados aleatorios gold/silver (solo index.html)

const membershipNames = {
  1: "Member",
  2: "Silver",
  3: "Gold"
};

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const members = await response.json();

    // Solo miembros silver (2) o gold (3)
    const eligible = members.filter((member) => member.membership >= 2);

    // Mezclar aleatoriamente y tomar 3
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error("Error al cargar los spotlights:", error);
  }
}

function displaySpotlights(members) {
  const container = document.querySelector(".spotlights");
  container.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("spotlight");
    card.innerHTML = `
      <img src="${member.image}" alt="Logo de ${member.name}" loading="lazy" width="100" height="100">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>📞 ${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visitar sitio web</a><br>
      <span class="membership">${membershipNames[member.membership]} Member</span>
    `;
    container.appendChild(card);
  });
}

getSpotlights();
