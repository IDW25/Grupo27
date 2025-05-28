// Filtros de ordenamiento para salones
import { obtenerSalones } from './salones.js';
import { renderizarCards } from './catalogoSalones.js';

document.getElementById("form-filtros").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("filtro-nombre").value.toLowerCase();
  const estado = document.getElementById("filtro-estado").value;
  const orden = document.getElementById("filtro-orden").value;

  let salones = obtenerSalones();

  if (nombre) {
    salones = salones.filter(salon =>
      salon.nombre.toLowerCase().includes(nombre)
    );
  }

  if (estado) {
    salones = salones.filter(salon => salon.estado === estado);
  }

  switch (orden) {
    case "price_asc":
      salones.sort((a, b) => a.precio - b.precio);
      break;
    case "price_desc":
      salones.sort((a, b) => b.precio - a.precio);
      break;
    case "name_asc":
      salones.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case "name_desc":
      salones.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;
  }

  renderizarCards(salones);
});
