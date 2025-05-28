// Filtros de ordenamiento para salones
import { renderizarCardsServicios } from './catalogoServicios.js';
import { obtenerServicios } from './servicios.js';

document.getElementById("form-filtros").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("filtro-nombre").value.toLowerCase();
  const orden = document.getElementById("filtro-orden").value;

  let servicios = obtenerServicios();

  if (nombre) {
    servicios = servicios.filter(servicio =>
      servicio.nombre.toLowerCase().includes(nombre)
    );
  }

  switch (orden) {
    case "price_asc":
      servicios.sort((a, b) => a.precio - b.precio);
      break;
    case "price_desc":
      servicios.sort((a, b) => b.precio - a.precio);
      break;
    case "name_asc":
      servicios.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case "name_desc":
      servicios.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;
  }

  renderizarCardsServicios(servicios);

});
