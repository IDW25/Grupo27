
// Constante de salones de eventos
export const salonesIniciales = [
  {
    id: 1,
    nombre: "Mundo Inflable",
    direccion: "Av. Rivadavia 8423, CABA",
    descripcion: "Un salón lleno de inflables para todas las edades. Ideal para hermosas aventuras.",
    precio: 150000,
    imagen: "Assets/salonA.png",
    estado: "Disponible"
  },
  {
    id: 2,
    nombre: "Mundo Elástico",
    direccion: "Av. Córdoba 3150, CABA",
    descripcion: "Un salón con camas elásticas originales. Sin límite de edad.",
    precio: 300000,
    imagen: "Assets/salonB.png",
    estado: "Reservado"    
  },
  {
    id: 3,
    nombre: "Mundo Acuático",
    direccion: "Don pedo 2100, La Boca",
    descripcion: "Salón temática con piscina y juegos acuáticos, ideal para cumpleaños en verano.",
    precio: 130000,
    imagen: "Assets/salonC.png",
    estado: "Disponible" 
  },
  {
    id: 4,
    nombre: "Fiesta Feliz",
    direccion: "Av. Salto Uruguayo 456, Belgrano",
    descripcion: "Salón amplio y luminoso con decoración versátil adaptable a cualquier temática.",
    precio: 50000,
    imagen: "Assets/salonD.png",
    estado: "Disponible"    
  },
  {
    id: 5,
    nombre: "Mundo Playa",
    direccion: "Av. Constitución 789, Nuñez",
    descripcion: "Salón con piscina y juegos acuáticos, ideal para fiestas en verano.",
    precio: 50000,
    imagen: "Assets/salonE.png",
    estado: "Disponible"    
  },
  {
    id: 6,
    nombre: "Bosque Encantado",
    direccion: "Calle Mitre 234, Caballito",
    descripcion: "Salón con ambientación de bosque y hadas. Perfecto para fiestas de fantasía.",
    precio: 450000,
    imagen: "Assets/salonF.png",
    estado: "Disponible"    
  },
  {
    id: 7,
    nombre: "Espacio Deportivo",
    direccion: "Av. Maipú 567, CABA",
    descripcion: "Salón con canchas deportivas y juegos de competencia para niños y niñas.",
    precio: 250000,
    imagen: "Assets/salonG.png",
    estado: "Disponible"    
  },
  {
    id: 8,
    nombre: "Mundo Científico",
    direccion: "Calle Sarmiento 890, Tigre",
    descripcion: "Salón con temática de ciencia y experimientos, ideal para niños curiosos.",
    precio: 290000,
    imagen: "Assets/salonH.png",
    estado: "Disponible"    
  },
  {
    id: 9 ,
    nombre: "Granja Feliz",
    direccion: "Ruta 14 Km 5, Tigre",
    descripcion: "Salón con temática de granja y animales, con espacios al aire libre.",
    precio: 320000,
    imagen: "Assets/salonI.png",
    estado: "Disponible"    
  }
];


// Inicialización de localStorage
// Si localStorage está vacío, guarda los datos de const salonesIniciales
export function inicializarLocalStorage() {
  if (!localStorage.getItem("salones")) {
    localStorage.setItem("salones", JSON.stringify(salonesIniciales));
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