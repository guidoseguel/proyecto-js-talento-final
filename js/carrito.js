const contenedorItems = document.querySelector(".carrito-items");
const contenedorTotal = document.getElementById("total");
const botonCheckout = document.getElementById("checkout-button");

let carrito = obtenerCarrito();

function mostrarCarrito() {
  if (!contenedorItems) return;

  contenedorItems.innerHTML = "";
  let totalAcumulado = 0;

  if (carrito.length === 0) {
    contenedorItems.innerHTML = "<p>Tu carrito está vacío.</p>";
    if (contenedorTotal) contenedorTotal.innerText = "0.00";
    return;
  }

  carrito.forEach((pizza) => {
    const item = document.createElement("div");
    item.classList.add("item-carrito-lista");

    item.innerHTML = `
            <p>${pizza.nombre} - <strong>$${pizza.precio}</strong></p>
        `;

    contenedorItems.appendChild(item);
    totalAcumulado += pizza.precio;
  });

  if (contenedorTotal) {
    contenedorTotal.innerText = totalAcumulado.toFixed(2);
  }
}

if (botonCheckout) {
  botonCheckout.addEventListener("click", () => {
    alert("¡Compra finalizada con éxito! Gracias por elegir Rotisería Yuumi.");
    localStorage.removeItem("carritoYuumi");
    carrito = [];
    mostrarCarrito();
  });
}

mostrarCarrito();
