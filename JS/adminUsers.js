document.addEventListener('DOMContentLoaded', async () => {
  const tbody = document.getElementById('tbody');

  // Intento traer los datos de usuarios de la API  
  try {
    const listaUsuarios = await fetch('https://dummyjson.com/users');
    
    const data = await listaUsuarios.json();
    const usuarios = data.users;

    // Recorro la lista de usuarios para cargarlos en la tabla
    usuarios.forEach((usuario) => {
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

  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    alert('¡Error con la API de usuarios!');
  }
});