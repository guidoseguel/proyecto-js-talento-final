function guardarCarrito(carrito) {
  localStorage.setItem("carritoYuumi", JSON.stringify(carrito));
}

function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem("carritoYuumi");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}
