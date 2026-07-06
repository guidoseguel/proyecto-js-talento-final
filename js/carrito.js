let carrito = JSON.parse(localStorage.getItem("carritoYuumi")) || [];

function agregarAlCarrito(producto) {
  let existe = carrito.find((item) => item.id == producto.id);
  if (existe) {
    existe.cantidad = (existe.cantidad || 1) + 1;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }
  guardarCarritoEnStorage();
  mostrarCarrito();
}

function guardarCarritoEnStorage() {
  localStorage.setItem("carritoYuumi", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function mostrarCarrito() {
  const contenedorItems = document.querySelector(".carrito-items");
  const contenedorTotal = document.getElementById("total");

  actualizarContadorCarrito();

  if (!contenedorItems) return;

  contenedorItems.innerHTML = "";
  let totalAcumulado = 0;

  if (carrito.length === 0) {
    contenedorItems.innerHTML = "<p>Tu carrito está vacío.</p>";
    if (contenedorTotal) contenedorTotal.innerText = "0.00";
    return;
  }

  carrito.forEach((pizza) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-carrito");

    const cantidad = pizza.cantidad || 1;
    const subtotal = pizza.precio * cantidad;

    tarjeta.innerHTML = `
           <img src="${window.location.pathname.includes("pages") ? "." : ""}${pizza.imagen}" alt="${pizza.nombre}" class="img-carrito">
            <div class="info-producto-carrito">
                <div class="detalle-producto">
                    <h4>${pizza.nombre}</h4>
                    <p class="precio-unitario">Precio: $${pizza.precio.toFixed(2)}</p>
                </div>
                <div class="controles-cantidad">
                    <button class="btn-menos" data-id="${pizza.id}">-</button>
                    <span class="numero-cantidad">${cantidad}</span>
                    <button class="btn-mas" data-id="${pizza.id}">+</button>
                </div>
                <div class="subtotal-producto">
                    <p>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
                </div>
                <button class="btn-eliminar-item" data-id="${pizza.id}">Eliminar</button>
            </div>
        `;

    contenedorItems.appendChild(tarjeta);
    totalAcumulado += subtotal;
  });

  if (contenedorTotal) {
    contenedorTotal.innerText = totalAcumulado.toFixed(2);
  }

  activarEventosBotones();
}

function modificarCantidad(id, accion) {
  const pizza = carrito.find((item) => item.id == id);
  if (pizza) {
    if (accion === "sumar") {
      pizza.cantidad++;
    } else if (accion === "restar") {
      pizza.cantidad--;
      if (pizza.cantidad <= 0) {
        eliminarProductoDelCarrito(id);
        return;
      }
    }
    guardarCarritoEnStorage();
    mostrarCarrito();
  }
}

function eliminarProductoDelCarrito(id) {
  carrito = carrito.filter((item) => item.id != id);
  guardarCarritoEnStorage();
  mostrarCarrito();
}

function activarEventosBotones() {
  document.querySelectorAll(".btn-mas").forEach((boton) => {
    boton.onclick = (e) => modificarCantidad(e.target.dataset.id, "sumar");
  });
  document.querySelectorAll(".btn-menos").forEach((boton) => {
    boton.onclick = (e) => modificarCantidad(e.target.dataset.id, "restar");
  });
  document.querySelectorAll(".btn-eliminar-item").forEach((boton) => {
    boton.onclick = (e) => eliminarProductoDelCarrito(e.target.dataset.id);
  });
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;
  const totalItems = carrito.reduce(
    (acc, item) => acc + (item.cantidad || 1),
    0,
  );
  contador.innerText = totalItems;
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  const botonCheckout = document.getElementById("checkout-button");
  if (botonCheckout) {
    botonCheckout.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("El carrito está vacío, mostro. Agregá algo primero.");
        return;
      }
      alert(
        "¡Compra finalizada con éxito! Gracias por elegir Rotisería Yuumi.",
      );
      localStorage.removeItem("carritoYuumi");
      carrito = [];
      mostrarCarrito();
    });
  }
});
