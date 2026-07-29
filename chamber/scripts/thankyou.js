// thankyou.js — display the submitted form data (thankyou.html only)

const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstname") ?? "";
const lastName = params.get("lastname") ?? "";

document.querySelector("#summary-name").textContent = `${firstName} ${lastName}`.trim();
document.querySelector("#summary-email").textContent = params.get("email") ?? "";
document.querySelector("#summary-phone").textContent = params.get("phone") ?? "";
document.querySelector("#summary-org").textContent = params.get("organization") ?? "";

// Format the hidden timestamp field into a readable date
const rawTimestamp = params.get("timestamp");
if (rawTimestamp) {
  const date = new Date(rawTimestamp);
  document.querySelector("#summary-timestamp").textContent = date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short"
  });
}
