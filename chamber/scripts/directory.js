// directory.js — member listing with grid/list toggle (directory.html only)

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
      throw new Error(`HTTP error: ${response.status}`);
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading the directory:", error);
    directory.innerHTML = "<p>The member directory could not be loaded.</p>";
  }
}

function displayMembers(members) {
  directory.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="90" height="90">
      <h3>${member.name}</h3>
      <p class="description">${member.description}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Website</a>
      <span class="membership">${levelNames[member.membership]}</span>
    `;
    directory.appendChild(card);
  });
}

// Toggle between grid and list views
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
