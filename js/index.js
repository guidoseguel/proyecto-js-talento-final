const contenedorPizzas = document.getElementById("contenedor-pizzas");
const contadorCarrito = document.getElementById("contador-carrito");
let carrito = obtenerCarrito();

if (contadorCarrito) {
  contadorCarrito.innerText = carrito.length;
}

async function cargarPizzas() {
  try {
    const respuesta = await fetch("./data/productos.json");
    const pizzas = await respuesta.json();

    mostrarPizzas(pizzas, contenedorPizzas);

    pizzas.forEach((pizza) => {
      const botonAgregar = document.getElementById(`btn-${pizza.id}`);
      if (botonAgregar) {
        botonAgregar.addEventListener("click", () => {
          agregarAlCarrito(pizza, carrito, contadorCarrito);
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

cargarPizzas();
