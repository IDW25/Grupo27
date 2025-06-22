import { inicializarLocalStorage, obtenerSalones } from './salones.js';

inicializarLocalStorage();

const salones = obtenerSalones();

mostrarDetalle(salones);

export function mostrarDetalle(salones) {
  const params = new URLSearchParams(window.location.search);
  const salonID = params.get('id');
  
  const salonEncontrado = salones.find(salon => salon.id == salonID);
  console.log(salonEncontrado);

  const imagenes = document.getElementById('imagenes');
  imagenes.innerHTML = '';
  const informacionSalon = document.getElementById('informacionSalon');
  informacionSalon.innerHTML = '';
  
  const nuevasImagenes = document.createElement('div');
  nuevasImagenes.innerHTML = `
   <div class="rounded mb-3 bg-image" style="background-image: url('${salonEncontrado.imagen}'); aspect-ratio: 4 / 3;"></div>
   <div class="row g-2">
     <div class="col-3">
       <img src="${salonEncontrado.imagen}" class="img-fluid img-thumbnail" alt="">
     </div>
     <div class="col-3">
       <img src="${salonEncontrado.imagen}" class="img-fluid img-thumbnail" alt="">
     </div>
     <div class="col-3">
       <img src="${salonEncontrado.imagen}" class="img-fluid img-thumbnail" alt="">
     </div>
     <div class="col-3">
       <img src="${salonEncontrado.imagen}" class="img-fluid img-thumbnail" alt="">
     </div>
   </div>
  `;

  let estado;
  if (salonEncontrado.estado == 'Disponible') {
   estado = `<span class="badge bg-success p-2">Disponible</span>`;
  } else if (salonEncontrado.estado == 'Reservado') {
   estado = `<span class="badge bg-danger p-2">Reservado</span">`;
  };

  const infoSalon = document.createElement('div');
  infoSalon.innerHTML = `
   <div class="card p-4 shadow">
     <div class="d-flex justify-content-between align-items-start">
       <h4 class="mb-0">${salonEncontrado.nombre}</h4>
       ${estado}
     </div>
     <a href="#" class="text-muted" disabled><i class="fa-solid fa-location-dot"></i> Dirección</a>
     <div class="my-3 bg-light p-2 rounded">
       <strong class="text-primary">${'$' + salonEncontrado.precio}</strong><br>
       <small class="text-muted">Precio por 4 horas</small>
     </div>
     <div class="mb-3">
       <h5 class="fw-bold">Descripción</h5>
       <p>${salonEncontrado.descripcion}</p>
     </div>
     <div class="mb-3">
       <h5 class="fw-bold">Características</h5>
       <ul id="ul" class="columnas list-unstyled"></ul>
     </div>
     <div class="card-footer bg-transparent border-top-0">
     <a href="presupuesto.html" class="btn btn-primary w-100">Incluir en el presupuesto</a>
     </div>
   </div>
  `;
  
  imagenes.appendChild(nuevasImagenes);
  informacionSalon.appendChild(infoSalon);

  const ul = document.getElementById('ul');

  salonEncontrado.caracteristicas.forEach((i) => {
  const li = document.createElement('li');
      li.textContent = i;
      ul.appendChild(li);
    });
}