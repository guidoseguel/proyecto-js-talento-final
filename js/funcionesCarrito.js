function agregarAlCarrito(productoNuevo) {
  const existe = carrito.find((item) => item.nombre === productoNuevo.nombre);

  if (existe) {
    if (!existe.cantidad) existe.cantidad = 1;
    existe.cantidad++;
  } else {
    productoNuevo.cantidad = 1;
    carrito.push(productoNuevo);
  }

  guardarCarritoEnStorage();
  mostrarCarrito();
}
