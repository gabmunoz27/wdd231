// navigation.js — menú hamburguesa responsivo (todas las páginas)

const menuBtn = document.querySelector("#menu-btn");
const navList = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuBtn.classList.toggle("open");
});
