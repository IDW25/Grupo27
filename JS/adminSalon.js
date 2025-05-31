import { guardarSalones, inicializarLocalStorage, obtenerSalones } from './salones.js';

inicializarLocalStorage();

const salones = obtenerSalones();

//Muestro salones en la tabla 
mostrarSalones(salones);


export function mostrarSalones(salones) {

  const contenedorBody = document.getElementById('tbody');
  contenedorBody.innerHTML = '';
  
  salones.forEach(salon => {
    let estado = '';
    if (salon.estado == 'Disponible') {
      estado = `<span class="badge bg-success">Disponible</span>`;
    } else if (salon.estado == 'Reservado') {
      estado = `<span class="badge bg-danger">Reservado</span>`;
    };

    const nuevaFila = document.createElement('tr');

    nuevaFila.innerHTML = `
      <td>${salon.id}</td>
      <td><img src="${obtenerSrcImagen(salon.imagen)}" width="50" height="50" style="object-fit: cover;"></td>
      <td>${salon.nombre}</td>
      <td>${salon.direccion}</td>
      <td>${'$' + salon.precio}</td>
      <td>${estado}</td>
      <td>
         <button class="btn btn-primary btn-sm me-2 editar" data-id="${salon.id}">
           <i class="fa-solid fa-pen-to-square"></i>
         </button>
         <button class="btn btn-danger btn-sm eliminar" data-id="${salon.id}">
           <i class="fa-solid fa-trash"></i>
         </button>
       </td>
    `;
    contenedorBody.appendChild(nuevaFila);
  });

  //Incorporo la funcionalidad de eliminar un salon
  document.querySelectorAll('.eliminar').forEach(boton => {
  boton.addEventListener('click', eliminarSalon);
  });

  //Incorporo la funcionalidad de editar un salon
  document.querySelectorAll('.editar').forEach(boton => {
  boton.addEventListener('click', editarSalon);
  });
};

//Incorporo la funcionalidad de agregar un nuevo salon

const btnNvo = document.getElementById('btnNvo');
const agregarSalon = document.querySelector('.agregarSalon');
const formAgregarSalon = document.getElementById('formAgregarSalon');
const cancelBtn = document.getElementById('cancelBtn');
const agregarSalonBtn = document.getElementById('agregarSalonBtn');


btnNvo.addEventListener('click', () => {
  agregarSalon.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

cancelBtn.addEventListener('click', () => {
  agregarSalon.style.display = 'none';
  document.body.style.overflow = 'auto';

});

function checkearFormularioSalon() {
  const titulo = document.getElementById('titulo').value;
  const direccion = document.getElementById('direccion').value;
  const valor = document.getElementById('valor').value;
  const disponible = document.getElementById('disponible').checked;
  const noDisponible = document.getElementById('noDisponible').checked;

  const llenadoRequerido =  titulo !== "" && 
                            direccion !== "" && 
                            valor !== "" && 
                            (disponible || noDisponible);
  if (llenadoRequerido) {
    document.getElementById('agregarSalonBtn').disabled = false;
  }
}

formAgregarSalon.addEventListener('input', checkearFormularioSalon);

function obtenerSrcImagen(imagen) {
  if (!imagen) return '';

  if (imagen.startsWith('data:')) {
    return imagen;
  }

  if (imagen.match(/^[a-zA-Z]:\\/)) {
    let rutaFile = imagen.replace(/\\/g, '/');
    return `file:///${rutaFile}`;
  }

  return `../${imagen}`;
}

function aBase64(file) {
    return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.readAsDataURL(file);
    lector.onload = () => resolve(lector.result);
    lector.onerror = error => reject(error);
  });
};

agregarSalonBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const direccion = document.getElementById('direccion').value;
  const descripcion = document.getElementById('descripcion').value;
  const valor = document.getElementById('valor').value;
  const disponible = document.getElementById('disponible').checked;
  const noDisponible = document.getElementById('noDisponible').checked;
  const imagen = document.getElementById('imagen').files[0];
  const imagenBase64 = imagen ? await aBase64(imagen) : '';

  const estado = disponible ? 'Disponible' : noDisponible ? 'Reservado' : '';

  const contenedorBody = document.getElementById('tbody');
  const nuevoID = contenedorBody.rows.length + 1;
  const nuevoSalon = {
    id: nuevoID,
    nombre: titulo,
    direccion: direccion,
    descripcion: descripcion,
    precio: valor,
    imagen: imagenBase64,
    estado: estado
  };

  salones.push(nuevoSalon);

  guardarSalones(salones);
  mostrarSalones(salones);

  document.body.style.overflow = 'auto';

  agregarSalon.style.display = 'none';
  
  document.getElementById('titulo').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('disponible').checked = false;
  document.getElementById('noDisponible').checked = false;
  document.getElementById('imagen').value = '';

  agregarSalonBtn.disabled = true;
});

//Funcion que elimina un elemento del arreglo (el event listener se encuentra en mostrarSalones())

function eliminarSalon(e) {

  const boton = e.currentTarget;
  const idEliminar = Number(boton.dataset.id);

  const salonEliminar = salones.find(salon => salon.id === idEliminar);
  if (!salonEliminar) return;

  const confirmar = confirm(`¿Estás seguro que quieres eliminar el salón "${salonEliminar.nombre}"?`);
  if (!confirmar) return;

  const salonesActualizados = salones.filter(salon => salon.id !== idEliminar);

  salones.length = 0;
  salones.push(...salonesActualizados);

  guardarSalones(salones);
  mostrarSalones(salones);
  
  document.querySelectorAll('.eliminar').forEach(boton => {
    boton.addEventListener('click', eliminarSalon);
  });
}

//Funcion para poder editar y guardar cambios 

const editarSalones = document.querySelector('.editarSalones');
const formEditarSalon = document.getElementById('formEditarSalon');
const guardarCambios = document.getElementById('guardarCambios');
const cancelBtnEditar = document.getElementById('cancelBtnEditar');

cancelBtnEditar.addEventListener('click', () => {
  editarSalones.style.display = 'none';
  document.body.style.overflow = 'auto';
});

formEditarSalon.addEventListener('input', () => {
  const tituloEd = document.getElementById('tituloEd').value.trim();
  const direccionEd = document.getElementById('direccionEd').value.trim();
  const descripcionEd = document.getElementById('descripcionEd').value.trim();
  const valorEd = document.getElementById('valorEd').value.trim();
  const disponibleEd = document.getElementById('disponibleEd').checked;
  const noDisponibleEd = document.getElementById('noDisponibleEd').checked;

  guardarCambios.disabled = !(tituloEd && direccionEd && descripcionEd && valorEd && (disponibleEd || noDisponibleEd));
});

let idSalonEditando = null;

function editarSalon(e) {
  document.body.style.overflow = 'hidden';

  const boton = e.currentTarget;
  const idEditar = Number(boton.dataset.id);
  
  const salonEditar = salones.find(salon => salon.id === idEditar);
  if (!salonEditar) return;

  idSalonEditando = idEditar;

  editarSalones.style.display = 'block';

  document.getElementById('tituloEd').value = salonEditar.nombre;
  document.getElementById('direccionEd').value = salonEditar.direccion;
  document.getElementById('descripcionEd').value = salonEditar.descripcion;
  document.getElementById('valorEd').value = salonEditar.precio;
  document.getElementById('disponibleEd').checked = (salonEditar.estado === 'Disponible');
  document.getElementById('noDisponibleEd').checked = (salonEditar.estado === 'Reservado');

  guardarCambios.disabled = false;
};

guardarCambios.addEventListener('click', async (e) => {
  document.body.style.overflow = 'auto';
  e.preventDefault();

  if (idSalonEditando === null) return;

  const tituloEd = document.getElementById('tituloEd').value.trim();
  const direccionEd = document.getElementById('direccionEd').value.trim();
  const descripcionEd = document.getElementById('descripcionEd').value.trim();
  const valorEd = document.getElementById('valorEd').value.trim();
  const disponibleEd = document.getElementById('disponibleEd').checked;
  const noDisponibleEd = document.getElementById('noDisponibleEd').checked;
  const imagenEd = document.getElementById('imagenEd').files[0];
  
  const salonIndex = salones.findIndex(salon => salon.id === idSalonEditando);
  if (salonIndex === -1) return;

  if (imagenEd) {
    salones[salonIndex].imagen = await aBase64(imagenEd);
  }

  salones[salonIndex].nombre = tituloEd;
  salones[salonIndex].direccion = direccionEd;
  salones[salonIndex].descripcion = descripcionEd;
  salones[salonIndex].precio = valorEd;
  salones[salonIndex].estado = disponibleEd ? 'Disponible' : noDisponibleEd ? 'Reservado' : '';

  guardarSalones(salones);
  mostrarSalones(salones);

  editarSalones.style.display = 'none';
  idSalonEditando = null;
  guardarCambios.disabled = true;

  formEditarSalon.reset();

  document.body.style.overflow = 'auto';
});