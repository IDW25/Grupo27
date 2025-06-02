// Muestra solo 3 servicios destacados en index.html

import { inicializarLocalStorage, obtenerServicios } from './servicios.js';

inicializarLocalStorage(); 

const contenedor = document.getElementById("servicios-destacados");
const servicios = obtenerServicios();
const destacados = servicios.slice(0, 4);

destacados.forEach(servicio => {
  const columna = document.createElement("div");
  columna.className = "col-12 col-sm-6 col-lg-3";

  columna.innerHTML = `

    <div class="card h-100 text-center card-serviciosadc">
      <div class="card-body">
        <div class="pasos-icon">
          <i class="fa-solid ${servicio.icono} text-white"></i>
        </div>
        <h5 class="card-title">${servicio.nombre}</h5>
        <p class="card-text mt-3">${servicio.descripcion}</p>
        <p class="card-text text-center mb-4">$${servicio.precio.toLocaleString()}</p>
      </div>
    </div>
  `;
  contenedor.appendChild(columna);
});