// Filtros de la sección administración - Gestionar Presupuesto

import { mostrarPresupuestos } from "./adminPresupuesto.js";

document.querySelector(".form-filtros-presupuestos").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("filtro-nombre").value.toLowerCase();
  const orden = document.getElementById("filtro-orden").value;

  let presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];

  let filtrados = presupuestos.filter((p) => {
    const coincideNombre = !nombre || p.cliente?.nombre?.toLowerCase().includes(nombre);
    return coincideNombre;
  });

  switch (orden) {
    case "price_asc":
      filtrados.sort((a, b) => a.total - b.total);
      break;
    case "price_desc":
      filtrados.sort((a, b) => b.total - a.total);
      break;
    case "name_asc":
      filtrados.sort((a, b) => a.cliente?.nombre.localeCompare(b.cliente?.nombre));
      break;
    case "name_desc":
      filtrados.sort((a, b) => b.cliente?.nombre.localeCompare(a.cliente?.nombre));
      break;
  }

  mostrarPresupuestos(filtrados);
});

