// thankyou.js — muestra los datos enviados por el formulario (solo thankyou.html)

const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstname") ?? "";
const lastName = params.get("lastname") ?? "";

document.querySelector("#summary-name").textContent = `${firstName} ${lastName}`.trim();
document.querySelector("#summary-email").textContent = params.get("email") ?? "";
document.querySelector("#summary-phone").textContent = params.get("phone") ?? "";
document.querySelector("#summary-org").textContent = params.get("organization") ?? "";

// Formatear el timestamp del campo oculto a un formato legible
const rawTimestamp = params.get("timestamp");
if (rawTimestamp) {
  const date = new Date(rawTimestamp);
  document.querySelector("#summary-timestamp").textContent = date.toLocaleString("es-EC", {
    dateStyle: "long",
    timeStyle: "short"
  });
}
