// join.js — timestamp del formulario y modales de membresía (solo join.html)

// Llenar el campo oculto con la fecha/hora en que se cargó el formulario
document.querySelector("#timestamp").value = new Date().toISOString();

// Abrir el modal correspondiente al hacer clic en cada tarjeta
document.querySelectorAll(".membership-card a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = document.querySelector(`#${link.dataset.modal}`);
    modal.showModal();
  });
});

// Cerrar con el botón ✕
document.querySelectorAll("dialog .close-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});

// Cerrar al hacer clic fuera del contenido del modal
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
});
