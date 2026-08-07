// navigation.js — responsive hamburger menu

const menuButton = document.querySelector("#menu-btn");
const navList = document.querySelector("#nav-list");

menuButton.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuButton.classList.toggle("open");

  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
});
