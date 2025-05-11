/* Editar el presupuesto */

let fila = null;
const editarPres = document.getElementById('editarPres');
const guardarCambios = document.getElementById('guardarCambios');
const formEditarPres = document.getElementById('formEditarPres');
const cancelBtn = document.getElementById('cancelBtn');

cancelBtn.addEventListener('click', () => {
  editarPres.style.display = 'none';
});

//Me aseguro que los cambios se guardan correctamente
function checkearEdicionForm () {
   const nombre = document.getElementById('nombrePresupuesto');
   const fecha = document.getElementById('fechaPresupuesto');
   const tematica = document.getElementById('tematicaPresupuesto');
   const salon = document.getElementById('salonPresupuesto');
   const valor = document.getElementById('valor');

   const rellenado = nombre.value !== "" &&
                     fecha.value !== "" &&
                     salon.value !== "" &&
                     valor.value !== "";
   
   if (rellenado) {
    guardarCambios.disabled = false;
    guardarCambiosDef();
   };
};

formEditarPres.addEventListener('input', checkearEdicionForm);

//Me permite editar la informacion desde el formulario
document.querySelectorAll('.editar').forEach(boton => {
 boton.addEventListener('click', function () {
  fila = this.closest('tr');
  const celdas = fila.querySelectorAll('td');

  editarPres.style.display = 'block';

  const nombre = document.getElementById('nombrePresupuesto');
  const fecha = document.getElementById('fechaPresupuesto');
  const tematica = document.getElementById('tematicaPresupuesto');
  const salon = document.getElementById('salonPresupuesto');
  const valor = document.getElementById('valor');

  nombre.value = celdas[1].textContent;
  fecha.value = celdas[2].textContent;
  tematica.value = celdas[3].textContent;
  salon.value = celdas[4].textContent;
  valor.value = celdas[5].textContent;
  
  checkearEdicionForm()
 })
});

//Me guarda la informacion editada en la tabla
function guardarCambiosDef () {
 guardarCambios.addEventListener('click', () => {
  const nombre = document.getElementById('nombrePresupuesto').value;
  const fecha = document.getElementById('fechaPresupuesto').value;
  const tematica = document.getElementById('tematicaPresupuesto').value;
  const salon = document.getElementById('salonPresupuesto').value;
  const valor = document.getElementById('valor').value;

  if (fila !== null) {
   const celdas = fila.querySelectorAll('td');
   celdas[1].textContent = nombre;
   celdas[2].textContent = fecha;
   celdas[3].textContent = tematica;
   celdas[4].textContent = salon;
   celdas[5].textContent = valor;

   editarPres.style.display = 'none';

   fila = null;

   this.reset();
  }
 });
};


/* Eliminar el presupuesto */

document.querySelectorAll('.eliminar').forEach(boton => {
 boton.addEventListener('click', function () {
  const fila = this.closest('tr');
  const celda = fila.querySelectorAll('td');
  const confirmar = confirm(`¿Estas seguro que deseas eliminar a ${celda[1].textContent} del presupuesto?`);
  if (confirmar) fila.remove();
 });
});

/* Exportar tabla: descargar archivo excel */

document.getElementById('btnExportar').addEventListener("click", function () {
   
   const tabla = document.querySelector('table').outerHTML;

   const blob = new Blob(
        [`<html><head><meta charset="UTF-8"></head><body>${tabla}</body></html>`],
        {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
    );

   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href = url;
   a.download = "presupuestos.xls";
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
});

/* Imprimir tabla */

document.getElementById("btnImprimir").addEventListener("click", function () {
    const tabla = document.querySelector("table").outerHTML;
    const ventana = window.open("", "_blank");
    ventana.document.write(`
        <html>
        <head>
            <title>Imprimir Presupuestos</title>
            <style>
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 8px; text-align: center; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2>Presupuestos</h2>
            ${tabla}
        </body>
        </html>
    `);
    ventana.document.close();
    ventana.print();
});