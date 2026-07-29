// directory.js — listado de miembros con toggle grid/lista (solo directory.html)

const directory = document.querySelector("#directory");
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");

const levelNames = {
  1: "Member",
  2: "Silver",
  3: "Gold"
};

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error al cargar el directorio:", error);
    directory.innerHTML = "<p>No se pudo cargar el directorio de miembros.</p>";
  }
}

function displayMembers(members) {
  directory.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="${member.image}" alt="Logo de ${member.name}" loading="lazy" width="90" height="90">
      <h3>${member.name}</h3>
      <p class="description">${member.description}</p>
      <p>${member.address}</p>
      <p>📞 ${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Sitio web</a>
    `;
    directory.appendChild(card);
  });
}

// Toggle entre vista de cuadrícula y lista
gridBtn.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
  listBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-pressed", "false");
});

getMembers();
