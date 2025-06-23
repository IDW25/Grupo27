// Lista de usuarios y filtros de gestionarUsuarios

document.addEventListener('DOMContentLoaded', async () => {
  const tbody = document.getElementById('tbody');
  const formFiltros = document.getElementById('form-filtros');
  const inputNombre = document.getElementById('filtro-nombre');
  const selectOrden = document.getElementById('filtro-orden');

  let usuarios = [];

  try {
    const respuesta = await fetch('https://dummyjson.com/users');
    const data = await respuesta.json();
    usuarios = data.users;
    renderTabla(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    alert('¡Error con la API de usuarios!');
  }

  formFiltros.addEventListener('submit', function (e) {
    e.preventDefault();

    const textoNombre = inputNombre.value.toLowerCase().trim();
    const orden = selectOrden.value;

    let filtrados = usuarios.filter(usuario => {
      const nombreCompleto = `${usuario.firstName} ${usuario.lastName}`.toLowerCase();
      return nombreCompleto.includes(textoNombre);
    });

    if (orden === 'id') {
      filtrados.sort((a, b) => a.id - b.id);
    } else if (orden === 'name_asc') {
      filtrados.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (orden === 'name_desc') {
      filtrados.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }

    renderTabla(filtrados);
  });

  function renderTabla(lista) {
    tbody.innerHTML = '';
    lista.forEach(usuario => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.username}</td>
        <td>${usuario.firstName} ${usuario.lastName}</td>
        <td>${usuario.email}</td>
        <td>${usuario.phone}</td>
      `;
      tbody.appendChild(fila);
    });
  }
});