import { guardarServicios, inicializarLocalStorage, obtenerServicios } from './servicios.js';
import { iconos } from './fontAwesome.js';

inicializarLocalStorage();

const servicios = obtenerServicios();

console.log(servicios)
mostrarServicios(servicios);

export function mostrarServicios(servicios) {
  
  //Incorporo las nuevas variables para mostrar servicios
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  //Recorro el arreglo servicio y selecciono las propiedad que es relevante

  servicios.forEach(servicio => {
    const nuevaFila = document.createElement('tr');

    nuevaFila.innerHTML = `
      <td>${servicio.id}</td>
      <td>${servicio.nombre}</td>
      <td class="text-start">${servicio.descripcion}</td>
      <td>${'$' + servicio.precio}</td>
      <td>
         <button class="btn btn-primary btn-sm me-2 editar" data-id="${servicio.id}">
           <i class="fa-solid fa-pen-to-square"></i>
         </button>
         <button class="btn btn-danger btn-sm eliminar" data-id="${servicio.id}">
           <i class="fa-solid fa-trash"></i>
         </button>
       </td>
    `;
    tbody.appendChild(nuevaFila);
  });

  //Incorporo la funcionalidad eliminar
  document.querySelectorAll('.eliminar').forEach(boton => {
  boton.addEventListener('click', eliminarServicio);
  });
  // //Incorporo la funcionalidad editar
  document.querySelectorAll('.editar').forEach(boton => {
  boton.addEventListener('click', editarServicio);
  });
};


//Agregar servicio

const btnNvo = document.getElementById('btnNvo');
const agregarServicio = document.querySelector('.agregarServicio');
const cancelBtn = document.getElementById('cancelBtn');
const formAgregarServicio = document.getElementById('formAgregarServicio');
const agregarServBtn = document.getElementById('agregarServBtn');
const inputIcono = document.getElementById('icono');
const mostrarIcono = document.getElementById('mostrarIcono');
let iconoSeleccionado = null;


btnNvo.addEventListener('click', () => {
  inputIcono.value = '';
  mostrarIcono.innerHTML = '';
  document.getElementById('nombreServicio').value = '';
  document.getElementById('descripcionServicio').value = '';
  document.getElementById('valor').value = '';
  agregarServicio.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
  agregarServicio.style.display = 'none';
});

//Me aseguro que el formulario se complete correctamente
function checkearFormularioServicio() {
  const nombre = document.getElementById('nombreServicio').value;
  const descripcion = document.getElementById('descripcionServicio').value;
  const valor = document.getElementById('valor').value;

  const llenadoRequerido =  descripcion !== "" && 
                            valor !== "" &&
                            nombre !== "";
  if (llenadoRequerido) {
    agregarServBtn.disabled = false;
  }
}

formAgregarServicio.addEventListener('input', checkearFormularioServicio);

//Agregaremos un nuevo servicio al localstorage
agregarServBtn.addEventListener('click', () => {
  const nombre = document.getElementById('nombreServicio').value.trim();
  const descripcion = document.getElementById('descripcionServicio').value.trim();
  const valor = document.getElementById('valor').value.trim();
  const icono = iconoSeleccionado;

  console.log(nombre, descripcion, valor);

  const tbody = document.getElementById('tbody');
  const nuevoID = tbody.rows.length + 1;

  const nuevoServicio = {
    id: nuevoID,
    nombre: nombre,
    descripcion: descripcion,
    precio: Number(valor),
    icono: icono
  };

  servicios.push(nuevoServicio);

  guardarServicios(servicios);

  mostrarServicios(servicios);

  agregarServicio.style.display = 'none';

  inputIcono.value = '';
  mostrarIcono.innerHTML = '';
  nombre.innerHTML = '';
  descripcion.innerHTML = '';
  valor.innerHTML = '';
});

//Eliminar un servicio

function eliminarServicio (e) {
  const boton = e.currentTarget;
  const id = Number(boton.dataset.id);
  idEditar = id;
  const indice = servicios.findIndex(servicio => servicio.id === idEditar);
  const objeto = servicios[indice];

  const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este servicio?');

  if (confirmar) {
    servicios.splice(indice, 1);
    guardarServicios(servicios);
    mostrarServicios(servicios);
  }

  idEditar = null;
};

//Editar un servicio
const cancelBtnEditar = document.getElementById('cancelBtnEditar');
const editarServicioPagina = document.querySelector('.editarServicio');

cancelBtnEditar.addEventListener('click', () => {
  editarServicioPagina.style.display = 'none';
});


//Incorporo la funcionalidad editar
const formEditarServicio = document.getElementById('formEditarServicio');
let idEditar = null;

function editarServicio(e) {
  const descripcion = document.getElementById('descripcionEd');
  const valor = document.getElementById('valorEd');
  const guardarServicioBtn = document.getElementById('guardarServicioBtn');
  const boton = e.currentTarget;
  const id = Number(boton.dataset.id);
  idEditar = id;
  const indice = servicios.findIndex(servicio => servicio.id === idEditar);
  const objeto = servicios[indice];

  editarServicioPagina.style.display = 'block';

  descripcion.value = objeto.descripcion;
  valor.value = objeto.precio;

  guardarServicioBtn.disabled = false;
};

guardarServicioBtn.addEventListener('click', () => {

  if (idEditar === null) return;

  const indice = servicios.findIndex(servicio => servicio.id === idEditar);
  const objeto = servicios[indice];
  const descripcion = document.getElementById('descripcionEd').value;
  const valor = document.getElementById('valorEd').value;

  const editado = {
   id: idEditar,
   nombre: objeto.nombre,
   descripcion: descripcion,
   precio: Number(valor),
   icono: objeto.icono,
  };

  servicios.splice(indice, 1, editado);
  guardarServicios(servicios);
  mostrarServicios(servicios);

  editarServicioPagina.style.display = 'none';

  formEditarServicio.reset();

  idEditar = null;
});

//FONT AWESOME

inputIcono.addEventListener('input', () => {

  iconoSeleccionado = null;
  const palabra = inputIcono.value.trim();
  mostrarIcono.innerHTML = '';

  const icono = iconos.filter(icono => icono.name.toLowerCase().includes(palabra.toLowerCase()));
  
  if (icono) {
    icono.forEach(icono => {
      const li = document.createElement('li');
      li.style.listStyle = 'none';
      li.innerHTML = `<i class="${icono.class}" style="color:#0072ce; padding: 20px 20px; font-size: 1.5em; cursor: pointer;"></i>`
      mostrarIcono.appendChild(li);
      li.addEventListener('click', () => {
        iconoSeleccionado = icono.class;
        mostrarIcono.innerHTML = `<p style="color:#0072ce; padding: 0 20px;">Icono seleccionado: <i class="${iconoSeleccionado}" style="color:#0072ce; padding: 20px 20px; font-size: 1.5em; cursor: pointer;"></i></p>`;
        inputIcono.value = `${icono.name}`;
     });
    });
  };
});