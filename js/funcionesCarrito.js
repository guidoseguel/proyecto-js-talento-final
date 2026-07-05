function agregarAlCarrito(pizza, carrito, contador) {
  carrito.push(pizza);
  guardarCarrito(carrito);
  if (contador) {
    contador.innerText = carrito.length;
  }
}
