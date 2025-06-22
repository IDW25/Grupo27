import { obtenerSalones } from "./salones.js"
import { obtenerServicios } from "./servicios.js"

let presupuestoActual = {
  salon: null,
  servicios: [],
  total: 0,
}

document.addEventListener("DOMContentLoaded", () => {
  const salones = obtenerSalones()
  const servicios = obtenerServicios()

  console.log("Salones cargados:", salones)
  console.log("Servicios cargados:", servicios)

  renderizarSalones(salones)
  renderizarServicios(servicios)

  configurarEventListeners()

  actualizarResumen()
})

function renderizarSalones(salones) {
  const contenedor = document.getElementById("salones-container")

  if (!contenedor) {
    console.error("Contenedor de salones no encontrado")
    return
  }

  contenedor.innerHTML = ""

  salones.forEach((salon) => {
    const salonCard = document.createElement("div")
    salonCard.className = "col-12 col-md-6 mb-4"

    salonCard.innerHTML = `
      <div class="card h-100">
        <div class="row g-0">
          <div class="col-12 col-md-5">
            <img src="${salon.imagen}" class="img-fluid w-100 h-100" alt="${salon.nombre}" style="object-fit: cover; height: 200px;">
          </div>
          <div class="col-12 col-md-7">
            <div class="card-body d-flex flex-column justify-content-between h-100">
              <div>
                <div class="form-check">
                  <input class="form-check-input salon-radio" type="radio" name="salon" id="salon-${salon.id}" value="${salon.id}" data-precio="${salon.precio}" data-nombre="${salon.nombre}">
                  <label class="form-check-label fw-bold" for="salon-${salon.id}">${salon.nombre}</label>
                </div>
                <p class="card-text small text-muted mb-1">
                  <i class="fas fa-map-marker-alt"></i> ${salon.direccion}
                </p>
                <p class="card-text small text-muted fw-semibold">$${salon.precio.toLocaleString()}</p>
                <span class="badge bg-${salon.estado === "Disponible" ? "success" : "danger"} mb-2">${salon.estado}</span>
              </div>
              <a href="detalleSalon.html?id=${salon.id}" class="btn btn-outline-primary btn-sm w-100" target="_blank">Ver Detalles</a>
            </div>
          </div>
        </div>
      </div>
    `

    contenedor.appendChild(salonCard)
  })
}

function renderizarServicios(servicios) {
  const contenedor = document.getElementById("servicios-container")

  if (!contenedor) {
    console.error("Contenedor de servicios no encontrado")
    return
  }

  contenedor.innerHTML = ""

  servicios.forEach((servicio) => {
    const servicioCard = document.createElement("div")
    servicioCard.className = "col-12 col-sm-6 col-lg-4 mb-3"

    servicioCard.innerHTML = `
      <div class="card h-100 text-center card-serviciosadc">
        <div class="card-body">
          <div class="pasos-icon">
            <i class="fa-solid ${servicio.icono} text-white"></i>
          </div>
          <h5 class="card-title">${servicio.nombre}</h5>
          <p class="card-text mt-3">${servicio.descripcion}</p>
          <p class="card-text text-center mb-4 fw-bold">$${servicio.precio.toLocaleString()}</p>
          <label class="switch">
            <input type="checkbox" class="servicio-checkbox" data-id="${servicio.id}" data-precio="${servicio.precio}" data-nombre="${servicio.nombre}">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `

    contenedor.appendChild(servicioCard)
  })
}

function configurarEventListeners() {
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("salon-radio")) {
      seleccionarSalon(e.target)
    }
  })

  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("servicio-checkbox")) {
      toggleServicio(e.target)
    }
  })

  const btnCalcular = document.getElementById("calcular-presupuesto")
  if (btnCalcular) {
    btnCalcular.addEventListener("click", (e) => {
      e.preventDefault()
      calcularPresupuestoFinal()
    })
  }

  const campos = ["nombre", "fecha", "correo", "telefono", "tematica"]
  campos.forEach((campo) => {
    const elemento = document.getElementById(campo)
    if (elemento) {
      elemento.addEventListener("input", actualizarResumen)
    }
  })
}

// seleccionar el salón
function seleccionarSalon(radioButton) {
  const salones = obtenerSalones()
  const salonId = Number.parseInt(radioButton.value)
  const salonPrecio = Number.parseInt(radioButton.dataset.precio)
  const salonNombre = radioButton.dataset.nombre

  const salonCompleto = salones.find((s) => s.id === salonId)


  presupuestoActual.salon = {
    id: salonId,
    nombre: salonNombre,
    precio: salonPrecio,
    direccion: salonCompleto ? salonCompleto.direccion : "",
    estado: salonCompleto ? salonCompleto.estado : "",
  }

  console.log("Salón seleccionado:", presupuestoActual.salon)
  actualizarResumen()
}

// seleccionar el o los servicios
function toggleServicio(checkbox) {
  const servicios = obtenerServicios()
  const servicioId = Number.parseInt(checkbox.dataset.id)
  const servicioPrecio = Number.parseInt(checkbox.dataset.precio)
  const servicioNombre = checkbox.dataset.nombre

  if (checkbox.checked) {
    const existe = presupuestoActual.servicios.find((s) => s.id === servicioId)
    if (!existe) {
      const servicioCompleto = servicios.find((s) => s.id === servicioId)
      presupuestoActual.servicios.push({
        id: servicioId,
        nombre: servicioNombre,
        precio: servicioPrecio,
        descripcion: servicioCompleto ? servicioCompleto.descripcion : "",
      })
    }
  } else {
    presupuestoActual.servicios = presupuestoActual.servicios.filter((servicio) => servicio.id !== servicioId)
  }

  console.log("Servicios seleccionados:", presupuestoActual.servicios)
  actualizarResumen()
}

// Actualizar el resumen
function actualizarResumen() {
  const resumenContainer = document.getElementById("resumen-presupuesto")

  if (!resumenContainer) {
    console.error("Contenedor de resumen no encontrado")
    return
  }

// Calcular el total del presupuesto
  let total = 0
  if (presupuestoActual.salon) {
    total += presupuestoActual.salon.precio
  }

  presupuestoActual.servicios.forEach((servicio) => {
    total += servicio.precio
  })

  presupuestoActual.total = total

  let resumenHTML = `
    <h4 class="mb-3">Resumen del presupuesto</h4>
  `

  if (presupuestoActual.salon || presupuestoActual.servicios.length > 0) {
    resumenHTML += `
      <div class="card">
        <div class="card-body">
    `

    // Mostrar salón seleccionado
    if (presupuestoActual.salon) {
      resumenHTML += `
        <div class="mb-3">
          <h6 class="fw-bold text-primary">Salón seleccionado:</h6>
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="fw-bold">${presupuestoActual.salon.nombre}</span>
              <br>
              <small class="text-muted">${presupuestoActual.salon.direccion}</small>
            </div>
            <span class="fw-bold text-success">$${presupuestoActual.salon.precio.toLocaleString()}</span>
          </div>
        </div>
      `
    }

    // Mostrar servicios seleccionados
    if (presupuestoActual.servicios.length > 0) {
      resumenHTML += `
        <div class="mb-3">
          <h6 class="fw-bold text-primary">Servicios seleccionados:</h6>
      `

      presupuestoActual.servicios.forEach((servicio) => {
        resumenHTML += `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <span>${servicio.nombre}</span>
              ${servicio.descripcion ? `<br><small class="text-muted">${servicio.descripcion}</small>` : ""}
            </div>
            <span class="fw-bold text-success">$${servicio.precio.toLocaleString()}</span>
          </div>
        `
      })

      resumenHTML += `</div>`
    }

    // Mostrar total
    resumenHTML += `
          <hr>
          <div class="d-flex justify-content-between">
            <span class="h5 fw-bold">Total:</span>
            <span class="h5 fw-bold text-primary">$${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `

    // Mostrar info adicional (si hay)
    const nombre = document.getElementById("nombre")?.value
    const fecha = document.getElementById("fecha")?.value

    if (nombre || fecha) {
      resumenHTML += `
        <div class="card mt-3">
          <div class="card-body">
            <h6 class="fw-bold text-primary">Información del evento:</h6>
            ${nombre ? `<p class="mb-1"><strong>Cliente:</strong> ${nombre}</p>` : ""}
            ${fecha ? `<p class="mb-1"><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString()}</p>` : ""}
          </div>
        </div>
      `
    }
  } else {
    resumenHTML += `
      <div class="alert alert-info d-flex align-items-center" role="alert">
        <i class="fas fa-info-circle me-2"></i>
        <div>
            Seleccioná un salón y los servicios para ver el presupuesto.
        </div>
      </div>
    `
  }

  resumenContainer.innerHTML = resumenHTML

  // si no hay salón seleccionado no se habilita el botón calcular
  const btnCalcular = document.getElementById("calcular-presupuesto")
  if (btnCalcular) {
    btnCalcular.disabled = !presupuestoActual.salon
    btnCalcular.textContent = presupuestoActual.salon
      ? `Calcular presupuesto ($${total.toLocaleString()})`
      : "Seleccioná un salón para continuar"
  }
}

// Función para calcular el presupuesto total
function calcularPresupuestoFinal() {
  if (!presupuestoActual.salon) {
    alert("Selección un salón.")
    return
  }

  // get de datos
  const nombre = document.getElementById("nombre").value.trim()
  const fecha = document.getElementById("fecha").value
  const correo = document.getElementById("correo").value.trim()
  const telefono = document.getElementById("telefono").value.trim()
  const tematica = document.getElementById("tematica").value
  const comentarios = document.getElementById("exampleFormControlTextarea1").value.trim()

  if (!nombre || !fecha || !correo || !telefono) {
    alert(
      "Por favor, completá todos los campos requeridos:\n- Nombre completo\n- Fecha del evento\n- Correo electrónico\n- Teléfono",
    )
    return
  }

  const fechaEvento = new Date(fecha)
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  if (fechaEvento < hoy) {
    alert("La fecha del evento no puede ser en el pasado.")
    return
  }

  // Objeto del presupuesto
  const presupuestoCompleto = {
    id: Date.now(), 
    cliente: {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
    },
    evento: {
      fecha: fecha,
      tematica: tematica !== "Seleccioná una temática" ? tematica : "",
      comentarios: comentarios,
    },
    salon: presupuestoActual.salon,
    servicios: [...presupuestoActual.servicios], 
    total: presupuestoActual.total,
    fechaCreacion: new Date().toISOString(),
  }

  console.log("Presupuesto final creado ok:", presupuestoCompleto)

  guardarPresupuesto(presupuestoCompleto)

  mostrarConfirmacion(presupuestoCompleto)
}

// guardo el presupuesto en localStorage para persistir los datos
function guardarPresupuesto(presupuesto) {
  try {
    const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || []
    presupuestos.push(presupuesto)
    localStorage.setItem("presupuestos", JSON.stringify(presupuestos))
    console.log("Presupuesto guardado exitosamente")
  } catch (error) {
    console.error("Error al guardar presupuesto:", error)
    alert("Error al guardar el presupuesto. Por favor, intentá nuevamente.")
  }
}

function mostrarConfirmacion(presupuesto) {
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

  // modal con los datos finales del presupuesto
  const modal = document.createElement("div")
  modal.className = "modal-content"
  modal.style.cssText = `
    background: white;
    border-radius: 10px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `

  modal.innerHTML = `
    <div class="modal-header bg-primary text-white p-4">
      <h5 class="modal-title m-0">¡Presupuesto Creado Exitosamente! 🎉</h5>
      <button type="button" class="btn-close btn-close-white" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
    </div>
    <div class="modal-body p-4">
      <div class="row">
        <div class="col-md-6">
          <h6 class="fw-bold text-primary">Datos del Cliente:</h6>
          <p class="mb-2"><strong>Nombre:</strong> ${presupuesto.cliente.nombre}</p>
          <p class="mb-2"><strong>Email:</strong> ${presupuesto.cliente.correo}</p>
          <p class="mb-2"><strong>Teléfono:</strong> ${presupuesto.cliente.telefono}</p>
          <p class="mb-2"><strong>Fecha del evento:</strong> ${new Date(presupuesto.evento.fecha).toLocaleDateString("es-AR")}</p>
          ${presupuesto.evento.tematica ? `<p class="mb-2"><strong>Temática:</strong> ${presupuesto.evento.tematica}</p>` : ""}
        </div>
        <div class="col-md-6">
          <h6 class="fw-bold text-primary">Resumen del Presupuesto:</h6>
          <div class="mb-3">
            <strong>Salón:</strong> ${presupuesto.salon.nombre}<br>
            <small class="text-muted">${presupuesto.salon.direccion}</small><br>
            <span class="text-success fw-bold">$${presupuesto.salon.precio.toLocaleString()}</span>
          </div>
          ${
            presupuesto.servicios.length > 0
              ? `
            <div class="mb-3">
              <strong>Servicios:</strong>
              <ul class="list-unstyled ms-3">
                ${presupuesto.servicios
                  .map(
                    (s) => `
                  <li class="d-flex justify-content-between">
                    <span>• ${s.nombre}</span>
                    <span class="text-success fw-bold">$${s.precio.toLocaleString()}</span>
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }
          <hr>
          <div class="d-flex justify-content-between">
            <span class="h5 fw-bold">Total:</span>
            <span class="h5 fw-bold text-primary">$${presupuesto.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      ${
        presupuesto.evento.comentarios
          ? `
        <div class="mt-4">
          <h6 class="fw-bold text-primary">Comentarios adicionales:</h6>
          <p class="text-muted bg-light p-3 rounded">${presupuesto.evento.comentarios}</p>
        </div>
      `
          : ""
      }
    </div>
    <div class="modal-footer p-4 border-top">
      <button type="button" class="btn btn-secondary me-2" onclick="cerrarModal()">Cerrar</button>
      <button type="button" class="btn btn-outline-primary me-2" onclick="window.print()">Imprimir</button>
      <button type="button" class="btn btn-success" onclick="confirmarEnvio()">Enviar</button>
    </div>
  `

  modalOverlay.appendChild(modal)
  document.body.appendChild(modalOverlay)

  //cerrar modal
  modal.querySelector(".btn-close").addEventListener("click", () => {
    document.body.removeChild(modalOverlay)
    limpiarFormulario()
  })

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay)
      limpiarFormulario()
    }
  })

  // Función para cerrar el modal
  window.cerrarModal = () => {
    document.body.removeChild(modalOverlay)
    limpiarFormulario()
  }

  // alert para confirmar que se envío ok
  window.confirmarEnvio = () => {
    alert("¡Gracias por elegirnos! En breve nos estaremos comunicando con vos. IDW S.A")
    document.body.removeChild(modalOverlay)
    limpiarFormulario()
  }
}

// Limpia el formulario una vez que se creó el objeto presupuesto
function limpiarFormulario() {
  const campos = ["nombre", "fecha", "correo", "telefono", "exampleFormControlTextarea1"]
  campos.forEach((campo) => {
    const elemento = document.getElementById(campo)
    if (elemento) elemento.value = ""
  })

  const tematica = document.getElementById("tematica")
  if (tematica) tematica.selectedIndex = 0

  document.querySelectorAll(".salon-radio").forEach((radio) => (radio.checked = false))
  document.querySelectorAll(".servicio-checkbox").forEach((checkbox) => (checkbox.checked = false))

  // vuevlo el presupuesto a 0
  presupuestoActual = {
    salon: null,
    servicios: [],
    total: 0,
  }

  actualizarResumen()
}
