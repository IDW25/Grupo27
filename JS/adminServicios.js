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
  //Incorporo la funcionalidad editar
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
  console.log(e);
};

//Editar un servicio

function editarServicio (e) {
  console.log(e);
};