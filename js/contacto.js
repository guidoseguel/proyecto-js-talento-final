const formularioContacto = document.querySelector("form");

if (formularioContacto) {
  formularioContacto.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "¡Gracias por tu mensaje! Desde Rotisería Yuumi te responderemos a la brevedad.",
    );
    formularioContacto.reset();
  });
}
