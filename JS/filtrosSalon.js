import { inicializarLocalStorage, obtenerSalones } from './salones.js';
import { mostrarSalones } from './adminSalon.js';

inicializarLocalStorage();

// Función para quitar tildes
function quitarTildes(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//Filtros de la sección administración - Gestionar Salones
document.getElementById("form-filtros-salon").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = quitarTildes(document.getElementById("filtro-nombre").value.toLowerCase());
  const estado = document.getElementById("filtro-estado").value;
  const orden = document.getElementById("filtro-orden").value;

  let salones = obtenerSalones();

  if (nombre) {
    salones = salones.filter(salon =>
      quitarTildes(salon.nombre.toLowerCase()).includes(nombre)
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

  mostrarSalones(salones);
});