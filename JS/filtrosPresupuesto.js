//Filtros de la sección administración - Gestionar Presupuesto
document.querySelector(".form-filtros-presupuestos").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("filtro-nombre").value.toLowerCase();
  const fecha = document.getElementById("date").value;
  const orden = document.getElementById("filtro-orden").value;

  console.log(nombre, fecha, orden)

  let presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];

  let filtrados = presupuestos.filter(p => {
    const coincideNombre = !nombre || p.cliente.nombre.toLowerCase().includes(nombre);
    const coincideFecha = !fecha || p.evento.fecha === fecha;
    return coincideNombre && coincideFecha;
  });

  switch (orden) {
    case "price_asc":
      filtrados.sort((a, b) => a.total - b.total);
      break;
    case "price_desc":
      filtrados.sort((a, b) => b.total - a.total);
      break;
    case "name_asc":
      filtrados.sort((a, b) => a.cliente.nombre.localeCompare(b.cliente.nombre));
      break;
    case "name_desc":
      filtrados.sort((a, b) => b.cliente.nombre.localeCompare(a.cliente.nombre));
      break;
  }

   renderizarTabla(filtrados);
});

function renderizarTabla(presupuestos) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if (presupuestos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">No se encontraron presupuestos.</td></tr>`;
    return;
  }

  presupuestos.forEach(p => {
    const servicios = p.servicios.map(s => s.nombre).join(", ");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.cliente.nombre}</td>
      <td>${p.evento.fecha}</td>
      <td>${p.evento.tematica}</td>
      <td>${p.salon.nombre}</td>
      <td>${servicios}</td>
      <td>$${p.total.toLocaleString()}</td>
      <td><button class="btn btn-sm btn-outline-primary">Editar</button></td>
    `;
    tbody.appendChild(row);
  });
}