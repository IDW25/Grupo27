// Constante de salones de eventos
export const salonesIniciar = [
  {
    id: 1,
    nombre: "Castillo Saltarín",
    direccion: "Av. Rivadavia 8423, CABA",
    descripcion: "Un salón lleno de inflables para todas las edades. Ideal para hermosas aventuras.",
    precio: 150000,
    imagen: "Assets/salonA.png",
    estado: "Disponible",
    caracteristicas: [
      "Capacidad 50 personas",
      "Estacionamiento",
      "Aire acondicionado",
      "Superficie 120m2",
      "Equipo de sonido",
      "Wifi"
    ]
  },
  {
    id: 2,
    nombre: "Salto Mágico",
    direccion: "Av. Córdoba 3150, CABA",
    descripcion: "Un salón con camas elásticas originales. Sin límite de edad.",
    precio: 300000,
    imagen: "Assets/salonB.png",
    estado: "Reservado",
    caracteristicas: [
      "Capacidad 60 personas",
      "Piso acolchado",
      "Área de descanso",
      "Superficie 100m2",
      "Música ambiental",
      "Control de acceso"
    ]
  },
  {
    id: 3,
    nombre: "Olas y Juegos",
    direccion: "Don pedo 2100, La Boca",
    descripcion: "Salón temática con piscina y juegos acuáticos, ideal para cumpleaños en verano.",
    precio: 130000,
    imagen: "Assets/salonC.png",
    estado: "Disponible",
    caracteristicas: [
      "Piscina climatizada",
      "Toboganes inflables",
      "Duchas disponibles",
      "Capacidad 40 personas",
      "Parrilla techada",
      "Vestidores"
    ]
  },
  {
    id: 4,
    nombre: "Aventura Kids",
    direccion: "Av. Salto Uruguayo 456, Belgrano",
    descripcion: "Salón amplio y luminoso con decoración versátil adaptable a cualquier temática.",
    precio: 50000,
    imagen: "Assets/salonD.png",
    estado: "Disponible",
    caracteristicas: [
      "Decoración personalizable",
      "Luces LED",
      "Pantalla para proyecciones",
      "Capacidad 70 personas",
      "Zona de arte y dibujo",
      "Wifi gratuito"
    ]
  },
  {
    id: 5,
    nombre: "Fiesta del Mar",
    direccion: "Av. Constitución 789, Nuñez",
    descripcion: "Salón con piscina y juegos acuáticos, ideal para fiestas en verano.",
    precio: 50000,
    imagen: "Assets/salonE.png",
    estado: "Disponible",
    caracteristicas: [
      "Piscina con juegos",
      "Sombrillas y camastros",
      "Zona verde",
      "Capacidad 50 personas",
      "Espacio techado",
      "Ambiente musical"
    ]
  },
  {
    id: 6,
    nombre: "Bosque de Sueños",
    direccion: "Calle Mitre 234, Caballito",
    descripcion: "Salón con ambientación de bosque y hadas. Perfecto para fiestas de fantasía.",
    precio: 450000,
    imagen: "Assets/salonF.png",
    estado: "Disponible",
    caracteristicas: [
      "Decoración de hadas",
      "Zona de lectura",
      "Capacidad 35 personas",
      "Sonido ambiental",
      "Juegos de rol",
      "Catering temático"
    ]
  },
  {
    id: 7,
    nombre: "Mini Olimpiadas",
    direccion: "Av. Maipú 567, CABA",
    descripcion: "Salón con canchas deportivas y juegos de competencia para niños y niñas.",
    precio: 250000,
    imagen: "Assets/salonG.png",
    estado: "Disponible",
    caracteristicas: [
      "Canchas multideporte",
      "Cronómetro digital",
      "Capacidad 80 personas",
      "Tribunas pequeñas",
      "Premios personalizados",
      "Hidratación incluida"
    ]
  },
  {
    id: 8,
    nombre: "Laboratorio Kids",
    direccion: "Calle Sarmiento 890, Tigre",
    descripcion: "Salón con temática de ciencia y experimientos, ideal para niños curiosos.",
    precio: 290000,
    imagen: "Assets/salonH.png",
    estado: "Disponible",
    caracteristicas: [
      "Talleres de ciencia",
      "Batas y gafas para niños",
      "Área de experimentos",
      "Capacidad 40 personas",
      "Pantalla interactiva",
      "Wifi y proyector"
    ]
  },
  {
    id: 9,
    nombre: "Granero Alegre",
    direccion: "Ruta 14 Km 5, Tigre",
    descripcion: "Salón con temática de granja y animales, con espacios al aire libre.",
    precio: 320000,
    imagen: "Assets/salonI.png",
    estado: "Disponible",
    caracteristicas: [
      "Zona de animales",
      "Tractor para paseos",
      "Capacidad 60 personas",
      "Área al aire libre",
      "Taller de huerta",
      "Juegos rústicos"
    ]
  }
];

// Inicialización de localStorage
// Si localStorage está vacío, guarda los datos de const salonesIniciar
export function inicializarLocalStorage() {
  if (!localStorage.getItem("salones")) {
    localStorage.setItem("salones", JSON.stringify(salonesIniciar));
  }
}

// Devuelve el array actual de salones
export function obtenerSalones() {
  return JSON.parse(localStorage.getItem("salones")) || [];
}

// Guarda un nuevo array de salones en localStorage
export function guardarSalones(salones) {
  localStorage.setItem("salones", JSON.stringify(salones));
}


const botonesVerDetalles = document.querySelectorAll('a.btn-full');

botonesVerDetalles.forEach(boton => {
  boton.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'detalleSalon.html';
  });
});