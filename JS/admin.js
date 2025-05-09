const agregarSalonBtn = document.getElementById('agregarSalonBtn');
const agregarSalon = document.querySelector('.agregarSalon');
const cancelBtn = document.getElementById('cancelBtn');
const formAgregarSalon = document.getElementById('formAgregarSalon');
const btnNvoSalon = document.getElementById('btnNvoSalon');


btnNvoSalon.addEventListener('click', () => {
  agregarSalon.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
  agregarSalon.style.display = 'none';
});

function checkearFormulario() {
  const titulo = document.getElementById('titulo').value;
  const direccion = document.getElementById('direccion').value;
  const valor = document.getElementById('valor').value;
  const disponible = document.getElementById('disponible').checked;
  const noDisponible = document.getElementById('noDisponible').checked;

  const llenadoRequerido =  titulo !== "" && 
                            direccion !== "" && 
                            valor !== "" && 
                            (disponible || noDisponible);

  agregarSalonBtn.disabled = !llenadoRequerido;
}

formAgregarSalon.addEventListener('input', checkearFormulario);

agregarSalonBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const direccion = document.getElementById('direccion').value;
  const valor = document.getElementById('valor').value;
  const disponible = document.getElementById('disponible').checked;
  const noDisponible = document.getElementById('noDisponible').checked;
  const imagen = document.getElementById('imagen').files[0];
  const imagenURL = imagen ? URL.createObjectURL(imagen) : '';

  const estado = disponible ? `<span class="badge bg-success">Disponible</span>` : noDisponible ? `<span class="badge bg-danger">Reservado</span>` : '';

  const tbody = document.querySelector('table tbody');
  const nuevoID = tbody.rows.length + 1;
  
  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML = `
      <td>${nuevoID}</td>
      <td><img src="${imagenURL} width="50px"></td>
      <td>${titulo}</td>
      <td>${direccion}</td>
      <td>${'$' + valor}</td>
      <td>${estado}</td>
      <td>
        <button class="btn btn-primary btn-sm me-2">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn btn-danger btn-sm">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
  `;

  tbody.appendChild(nuevaFila);
  agregarSalon.style.display = 'none';
  
  document.getElementById('titulo').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('disponible').checked = false;
  document.getElementById('noDisponible').checked = false;
  document.getElementById('imagen').value = '';

  agregarSalonBtn.disabled = true;
});