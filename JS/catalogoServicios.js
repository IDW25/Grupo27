import { serviciosIniciales, obtenerServicios, inicializarLocalStorage } from './servicios.js';

inicializarLocalStorage();

const servicios = obtenerServicios();

renderizarCardsServicios(servicios); 

// Renderiza todos los salones consumiendo los datos desde LocalStorage
export function renderizarCardsServicios(servicios) {
  const contenedor = document.getElementById("servicios-cards");
  contenedor.innerHTML = ""; // limpia el contenedor antes de renderizar

  servicios.forEach(servicio => {
    // creo un div que contenga la constante
    const content = document.createElement("div");
    content.className = "col-12 col-sm-6 col-lg-4";

    content.innerHTML = `
    <div class="card h-100 text-center card-serviciosadc">
      <div class="card-body">
        <div class="pasos-icon">
          <i class="fa-solid ${servicio.icono} text-white"></i>
        </div>
        <h5 class="card-title">${servicio.nombre}</h5>
        <p class="card-text mt-3">${servicio.descripcion}</p>
        <p class="card-text text-center mb-4">$${servicio.precio.toLocaleString()}</p>
        <button class="btn btn-primary w-100">Incluir en el presupuesto</button>
      </div>
    </div>
  `;

  contenedor.appendChild(content);
});
}