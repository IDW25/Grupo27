document.addEventListener("DOMContentLoaded", () => {
  cargarPresupuestos()
})

// Función para cargar presupuestos desde localStorage
export function cargarPresupuestos() {
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || []
  console.log("Presupuestos cargados:", presupuestos)
  mostrarPresupuestos(presupuestos)
};

// Función para mostrar presupuestos en la tabla

function mostrarPresupuestos(presupuestos) {
  const tbody = document.querySelector("tbody")

  if (!tbody) {
    console.error("No se encontró el tbody de la tabla")
    return
  }

  // Limpiar la tabla
  tbody.innerHTML = ""

  if (presupuestos.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted">
          No hay presupuestos :(
        </td>
      </tr>
    `
    return
  }

  // Renderizar cada presupuesto
  presupuestos.forEach((presupuesto, index) => {
    const fila = document.createElement("tr")

    // Format de servicios para mostrar
    const serviciosTexto =
      presupuesto.servicios && presupuesto.servicios.length > 0
        ? presupuesto.servicios.map((s) => s.nombre).join(", ")
        : "Sin servicios"

    // Format para la fecha
    const fechaFormateada =
      presupuesto.evento && presupuesto.evento.fecha
        ? new Date(presupuesto.evento.fecha).toLocaleDateString("es-AR")
        : "Sin fecha"

    fila.innerHTML = `
      <td>${presupuesto.id || index + 1}</td>
      <td>${presupuesto.cliente ? presupuesto.cliente.nombre : "Falta el nombre"}</td>
      <td>${fechaFormateada}</td>
      <td>${presupuesto.evento && presupuesto.evento.tematica ? presupuesto.evento.tematica : "Falta la temática"}</td>
      <td>${presupuesto.salon ? presupuesto.salon.nombre : "Falta el salón"}</td>
      <td class="text-truncate" style="max-width: 150px;" title="${serviciosTexto}">${serviciosTexto}</td>
      <td>$${presupuesto.total ? presupuesto.total.toLocaleString() : "0"}</td>
      <td>
        <button class="btn btn-primary btn-sm me-2 editar" data-id="${presupuesto.id || index}">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn btn-danger btn-sm eliminar" data-id="${presupuesto.id || index}">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn btn-info btn-sm ver-detalles" data-id="${presupuesto.id || index}">
          <i class="fa-solid fa-eye"></i>
        </button>
      </td>
    `

    tbody.appendChild(fila)
  })

  //event listeners después de renderizar
  configurarEventListeners()
}

// event listeners para los botones
function configurarEventListeners() {
  // Epara editar
  document.querySelectorAll(".editar").forEach((boton) => {
    boton.addEventListener("click", function () {
      editarPresupuesto(this.dataset.id)
    })
  })

  // para eliminar
  document.querySelectorAll(".eliminar").forEach((boton) => {
    boton.addEventListener("click", function () {
      eliminarPresupuesto(this.dataset.id)
    })
  })

  // para ver detalles
  document.querySelectorAll(".ver-detalles").forEach((boton) => {
    boton.addEventListener("click", function () {
      verDetallesPresupuesto(this.dataset.id)
    })
  })
}

// Función para editar el presupuesto
function editarPresupuesto(id) {
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || []
  const presupuesto = presupuestos.find((p) => p.id == id)

  if (!presupuesto) {
    alert("Presupuesto no encontrado")
    return
  }

  // Mostrar modal de edición
  const editarPres = document.getElementById("editarPres")
  if (editarPres) {
    editarPres.style.display = "block"

    // Llenar campos del formulario
    document.getElementById("nombrePresupuesto").value = presupuesto.cliente ? presupuesto.cliente.nombre : ""
    document.getElementById("fechaPresupuesto").value =
      presupuesto.evento && presupuesto.evento.fecha ? presupuesto.evento.fecha : ""
    document.getElementById("tematicaPresupuesto").value =
      presupuesto.evento && presupuesto.evento.tematica ? presupuesto.evento.tematica : ""
    document.getElementById("salonPresupuesto").value = presupuesto.salon ? presupuesto.salon.nombre : ""
    document.getElementById("valor").value = presupuesto.total || 0

    // Guardar ID para poder editar luego
    editarPres.dataset.editandoId = id
  }
}

// Función para eliminar el presupuesto
function eliminarPresupuesto(id) {
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || []
  const presupuesto = presupuestos.find((p) => p.id == id)

  if (!presupuesto) {
    alert("Presupuesto no encontrado")
    return
  }

  const nombreCliente = presupuesto.cliente ? presupuesto.cliente.nombre : "No hyy datos del cliente"
  const confirmar = confirm(`¿Estás seguro que querés eliminar el presupuesto de ${nombreCliente}?`)

  if (confirmar) {
    const presupuestosActualizados = presupuestos.filter((p) => p.id != id)
    localStorage.setItem("presupuestos", JSON.stringify(presupuestosActualizados))
    cargarPresupuestos() 
    alert("Presupuesto eliminado exitosamente")
  }
}

// Función para ver el presupuesto ampliado
function verDetallesPresupuesto(id) {
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || []
  const presupuesto = presupuestos.find((p) => p.id == id)

  if (!presupuesto) {
    alert("Presupuesto no encontrado")
    return
  }

  //modal de detalles
  const modalOverlay = document.createElement("div")
  modalOverlay.className = "modal-overlay"
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  const modal = document.createElement("div")
  modal.className = "modal-content"
  modal.style.cssText = `
    background: white;
    border-radius: 10px;
    max-width: 700px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `

  const serviciosHTML =
    presupuesto.servicios && presupuesto.servicios.length > 0
      ? presupuesto.servicios
          .map(
            (s) => `
        <li class="d-flex justify-content-between">
          <span>• ${s.nombre}</span>
          <span class="text-success fw-bold">$${s.precio.toLocaleString()}</span>
        </li>
      `,
          )
          .join("")
      : "<li>Sin servicios adicionales</li>"

  modal.innerHTML = `
    <div class="modal-header bg-primary text-white p-4">
      <h5 class="modal-title m-0">Detalles del Presupuesto #${presupuesto.id}</h5>
      <button type="button" class="btn-close btn-close-white" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
    </div>
    <div class="modal-body p-4">
      <div class="row">
        <div class="col-md-6">
          <h6 class="fw-bold text-primary">Información del Cliente:</h6>
          <p class="mb-2"><strong>Nombre:</strong> ${presupuesto.cliente ? presupuesto.cliente.nombre : "SIn nombre"}</p>
          <p class="mb-2"><strong>Email:</strong> ${presupuesto.cliente ? presupuesto.cliente.correo : "Sin correo"}</p>
          <p class="mb-2"><strong>Teléfono:</strong> ${presupuesto.cliente ? presupuesto.cliente.telefono : "Sin teléfono"}</p>
          <p class="mb-2"><strong>Fecha del evento:</strong> ${presupuesto.evento && presupuesto.evento.fecha ? new Date(presupuesto.evento.fecha).toLocaleDateString("es-AR") : "No especificada"}</p>
          <p class="mb-2"><strong>Temática:</strong> ${presupuesto.evento && presupuesto.evento.tematica ? presupuesto.evento.tematica : "Sin temática"}</p>
        </div>
        <div class="col-md-6">
          <h6 class="fw-bold text-primary">Detalles del Evento:</h6>
          <div class="mb-3">
            <strong>Salón:</strong> ${presupuesto.salon ? presupuesto.salon.nombre : "Sin salón"}<br>
            ${presupuesto.salon && presupuesto.salon.direccion ? `<small class="text-muted">${presupuesto.salon.direccion}</small><br>` : ""}
            <span class="text-success fw-bold">$${presupuesto.salon ? presupuesto.salon.precio.toLocaleString() : "0"}</span>
          </div>
          <div class="mb-3">
            <strong>Servicios:</strong>
            <ul class="list-unstyled ms-3">
              ${serviciosHTML}
            </ul>
          </div>
          <hr>
          <div class="d-flex justify-content-between">
            <span class="h5 fw-bold">Total:</span>
            <span class="h5 fw-bold text-primary">$${presupuesto.total ? presupuesto.total.toLocaleString() : "0"}</span>
          </div>
        </div>
      </div>
      ${
        presupuesto.evento && presupuesto.evento.comentarios
          ? `
        <div class="mt-4">
          <h6 class="fw-bold text-primary">Comentarios:</h6>
          <p class="text-muted bg-light p-3 rounded">${presupuesto.evento.comentarios}</p>
        </div>
      `
          : ""
      }
      <div class="mt-3">
        <small class="text-muted">Creado el: ${presupuesto.fechaCreacion ? new Date(presupuesto.fechaCreacion).toLocaleString("es-AR") : "Fecha no disponible"}</small>
      </div>
    </div>
    <div class="modal-footer p-4 border-top">
      <button type="button" class="btn btn-secondary" onclick="cerrarModalDetalles()">Cerrar</button>
    </div>
  `

  modalOverlay.appendChild(modal)
  document.body.appendChild(modalOverlay)

  // cerrar el modal
  modal.querySelector(".btn-close").addEventListener("click", () => {
    document.body.removeChild(modalOverlay)
  })

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay)
    }
  })

  window.cerrarModalDetalles = () => {
    document.body.removeChild(modalOverlay)
  }
}

// formulario de edición eventos
document.addEventListener("DOMContentLoaded", () => {
  const editarPres = document.getElementById("editarPres")
  const guardarCambios = document.getElementById("guardarCambios")
  const cancelBtn = document.getElementById("cancelBtn")

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      editarPres.style.display = "none"
    })
  }

  if (guardarCambios) {
    guardarCambios.addEventListener("click", () => {
      guardarCambiosPresupuesto()
    })
  }

  // validación del formulario
  const formEditarPres = document.getElementById("formEditarPres")
  if (formEditarPres) {
    formEditarPres.addEventListener("input", validarFormularioEdicion)
  }
})

// función para validar el formulario de edición
function validarFormularioEdicion() {
  const nombre = document.getElementById("nombrePresupuesto").value.trim()
  const fecha = document.getElementById("fechaPresupuesto").value
  const salon = document.getElementById("salonPresupuesto").value.trim()
  const valor = document.getElementById("valor").value

  const guardarCambios = document.getElementById("guardarCambios")
  if (guardarCambios) {
    guardarCambios.disabled = !(nombre && fecha && salon && valor)
  }
}

// guardar cambios del presupuesto editado 
function guardarCambiosPresupuesto() {
  const editarPres = document.getElementById("editarPres")
  const id = editarPres.dataset.editandoId

  if (!id) {
    alert("Error: No se puede identificar el presupuesto a editar")
    return
  }

  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || []
  const indice = presupuestos.findIndex((p) => p.id == id)

  if (indice === -1) {
    alert("Error: Presupuesto no encontrado")
    return
  }

  // get de valores del formulario
  const nombre = document.getElementById("nombrePresupuesto").value.trim()
  const fecha = document.getElementById("fechaPresupuesto").value
  const tematica = document.getElementById("tematicaPresupuesto").value.trim()
  const salon = document.getElementById("salonPresupuesto").value.trim()
  const valor = Number.parseFloat(document.getElementById("valor").value) || 0

  // actualizar el presupuesto sobreescribiendo la info que estaba antes
  presupuestos[indice] = {
    ...presupuestos[indice],
    cliente: {
      ...presupuestos[indice].cliente,
      nombre: nombre,
    },
    evento: {
      ...presupuestos[indice].evento,
      fecha: fecha,
      tematica: tematica,
    },
    salon: {
      ...presupuestos[indice].salon,
      nombre: salon,
    },
    total: valor,
    fechaModificacion: new Date().toISOString(),
  }

  // guardar en localStorage
  localStorage.setItem("presupuestos", JSON.stringify(presupuestos))

  // recargar la tabla
  editarPres.style.display = "none"
  cargarPresupuestos()

  alert("Presupuesto actualizado exitosamente")
}

document.getElementById("btnExportar")?.addEventListener("click", () => {
  const tabla = document.querySelector("table").outerHTML
  const blob = new Blob([`<html><head><meta charset="UTF-8"></head><body>${tabla}</body></html>`], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "presupuestos.xls"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
})

document.getElementById("btnImprimir")?.addEventListener("click", () => {
  const tabla = document.querySelector("table").outerHTML
  const ventana = window.open("", "_blank")
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
  `)
  ventana.document.close()
  ventana.print()
})
