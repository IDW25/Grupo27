const btnNvo = document.getElementById('btnNvo');
const agregarServicioBtn = document.getElementById('agregarServBtn');
const formAgregarServicio = document.getElementById('formAgregarServicio');
const agregarServicio = document.querySelector('.agregarServicio');

btnNvo.addEventListener('click', () => {
  agregarServicio.style.display = 'block';
});
cancelBtn.addEventListener('click', () => {
  agregarServicio.style.display = 'none';
});

function checkearFormularioServicio() {
  const descripcionServicio = document.getElementById('descripcionServicio').value;
  const valor = document.getElementById('valor').value;

  const llenadoRequerido =  descripcionServicio !== "" &&  
                            valor !== "";
  if (llenadoRequerido) {
    document.getElementById('agregarServBtn').disabled = false;
  }
}

formAgregarServicio.addEventListener('input', checkearFormularioServicio);

agregarServicioBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const descripcionServicio = document.getElementById('descripcionServicio').value;
  const valor = document.getElementById('valor').value;

  const tbody = document.querySelector('table tbody');
  const nuevoID = tbody.rows.length + 1;

  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML = `
      <td>${nuevoID}</td>
      <td class="text-start">${descripcionServicio}</td>
      <td>${'$' + valor}</td>
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
  agregarServicio.style.display = 'none';
  
  document.getElementById('descripcionServicio').value = '';
  document.getElementById('valor').value = '';

  console.log(descripcionServicio, valor);
});