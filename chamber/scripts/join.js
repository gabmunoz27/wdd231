// join.js — form timestamp and membership benefit modals (join.html only)

// Store the date and time the form was loaded by the user
document.querySelector("#timestamp").value = new Date().toISOString();

// Open the matching modal when a card link is clicked
document.querySelectorAll(".membership-card a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const modal = document.querySelector(`#${link.dataset.modal}`);
    modal.showModal();
  });
});

// Close with the X button
document.querySelectorAll("dialog .close-modal").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// Close when clicking outside the modal content
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});
