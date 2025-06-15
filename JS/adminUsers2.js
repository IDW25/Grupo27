document.addEventListener('DOMContentLoaded', async () => {
  const tbody = document.getElementById('tbody');

  try {
    const res = await fetch('https://dummyjson.com/users');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    const usuarios = data.users;

    usuarios.forEach((usuario) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.firstName} ${usuario.lastName}</td>
        <td>${usuario.username}</td>
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