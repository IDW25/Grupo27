// Muestra solo 3 salones destacados en index.html

import { inicializarLocalStorage, obtenerSalones } from './salones.js';

inicializarLocalStorage(); 

const contenedor = document.getElementById("salones-destacados");
const salones = obtenerSalones();
const destacados = salones.slice(0, 3);

destacados.forEach(salon => {
  const columna = document.createElement("div");
  columna.className = "col-12 col-sm-6 col-lg-4";

  columna.innerHTML = `
  <div class="card h-100 shadow-sm">
    <div class="ratio ratio-4x3 position-relative">
      <img src="${salon.imagen}" class="img-fluid w-100" alt="${salon.nombre}">
      <div class="position-absolute top-0 start-0 p-2">
        <span class="badge bg-${salon.estado === "Disponible" ? "success" : "danger"}">${salon.estado}</span>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">${salon.nombre}</h5>
      <p class="card-text">${salon.descripcion}</p>
      <p><i class="fas fa-map-marker-alt me-2"></i>${salon.direccion}</p>
      <p><i class="fas fa-tag me-2"></i>$${salon.precio.toLocaleString()}</p>
    </div>
    <div class="card-footer bg-transparent border-top-0">
      <a href="detalleSalon.html?id=${salon.id}" class="btn btn-primary w-100">Ver Detalles</a>
    </div>
  </div>
  `;
  contenedor.appendChild(columna);
});