function mostrarPizzas(pizzas, contenedor) {
  if (!contenedor) return;
  contenedor.innerHTML = "";

  pizzas.forEach((pizza) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card", "text-secondary");

    tarjeta.innerHTML = `
            <img src="${pizza.img}" alt="${pizza.nombre}">
            <h3>${pizza.nombre}</h3>
            <p class="precio">$${pizza.precio}</p>
            <button class="agregar-carrito btn bg-secondary text-dark" id="btn-${pizza.id}">
                Agregar al carrito
            </button>
        `;

    contenedor.appendChild(tarjeta);
  });
}
