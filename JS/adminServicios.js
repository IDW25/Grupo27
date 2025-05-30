import { guardarSalones, inicializarLocalStorage, obtenerSalones } from './salones.js';

inicializarLocalStorage();

const salones = obtenerSalones();

mostrarServicios(salones);

export function mostrarServicios(salones) {
  
  //Incorporo las nuevas variables para mostrar servicios
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  //Recorro el arreglo salones y selecciono las propiedad que es relevante

  salones.forEach(salon => {
    const nuevaFila = document.createElement('tr');

    nuevaFila.innerHTML = `
      <td>${salon.id}</td>
      <td class="text-start">${salon.descripcion}</td>
      <td>${'$' + salon.precio}</td>
      <td>
         <button class="btn btn-primary btn-sm me-2 editar" data-id="${salon.id}">
           <i class="fa-solid fa-pen-to-square"></i>
         </button>
         <button class="btn btn-danger btn-sm eliminar" data-id="${salon.id}">
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


btnNvo.addEventListener('click', () => {
  agregarServicio.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
  agregarServicio.style.display = 'none';
});

//Me aseguro que el formulario se complete correctamente
function checkearFormularioServicio() {
  const descripcion = document.getElementById('descripcionServicio').value;
  const valor = document.getElementById('valor').value;

  const llenadoRequerido =  descripcion !== "" && 
                            valor !== "";
  if (llenadoRequerido) {
    agregarServBtn.disabled = false;
  }
}

formAgregarServicio.addEventListener('input', checkearFormularioServicio);

//Agregaremos un nuevo servicio al localstorage
agregarServBtn.addEventListener('click', () => {
  const descripcion = document.getElementById('descripcionServicio').value.trim();
  const valor = document.getElementById('valor').value.trim();
  console.log(descripcion, valor);

  const tbody = document.getElementById('tbody');
  const nuevoID = contenedorBody.rows.length + 1;

  /*NO ESTOY SEGURO COMO IMPLEMENTAR ESTA PARTE. QUE SERVICIOS NOS REFERIMOS?*/

});

//Eliminar un servicio

function eliminarServicio (e) {
  const boton = e.currentTarget;
  const id = Number(boton.dataset.id);
  idEditar = id;
  const indice = id - 1;
  const objeto = salones[indice];

  const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este servicio?');

  if (confirmar) {
    salones.splice(indice, 1);
    guardarSalones(salones);
    mostrarServicios(salones);
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
  const indice = id - 1;
  const objeto = salones[indice];

  editarServicioPagina.style.display = 'block';

  descripcion.value = objeto.descripcion;
  valor.value = objeto.precio;

  guardarServicioBtn.disabled = false;
};

guardarServicioBtn.addEventListener('click', () => {

  if (idEditar === null) return;

  const indice = idEditar - 1;
  const objeto = salones[indice];
  const descripcion = document.getElementById('descripcionEd').value;
  const valor = document.getElementById('valorEd').value;

  const editado = {
   id: idEditar,
   nombre: objeto.nombre,
   direccion: objeto.direccion,
   descripcion: descripcion,
   precio: Number(valor),
   imagen: objeto.imagen,
   estado: objeto.estado
  };

  salones.splice(indice, 1, editado);
  guardarSalones(salones);
  mostrarServicios(salones);

  editarServicioPagina.style.display = 'none';

  formEditarServicio.reset();

  idEditar = null;
});