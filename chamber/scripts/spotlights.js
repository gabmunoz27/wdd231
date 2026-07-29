// spotlights.js — random gold/silver member spotlights (index.html only)

const membershipNames = {
  1: "Member",
  2: "Silver",
  3: "Gold"
};

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const members = await response.json();

    // Keep only silver (2) and gold (3) members
    const eligible = members.filter((member) => member.membership >= 2);

    // Shuffle randomly and take three
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function displaySpotlights(members) {
  const container = document.querySelector(".spotlights");
  container.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("spotlight");
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit website</a><br>
      <span class="membership">${membershipNames[member.membership]} Member</span>
    `;
    container.appendChild(card);
  });
}

getSpotlights();
