// Constante de salones de eventos
export const serviciosIniciales = [
    {
      id: 1,
      nombre: "Torta Tematica",
      descripcion: "Pastel decorado según un tema específico, como personajes o celebraciones especiales.",
      precio: 30000,
      icono: "fa-cake-candles"
    },
    {
      id: 2,
      nombre: "Show de Magia",
      descripcion: "Actuación divertida con trucos sorprendentes para entretener a los niños.",
      precio: 25000,
      icono: "fa-wand-magic"
    },
    {
      id: 3,
      nombre: "Pinta Caritas",
      descripcion: "Diseños divertidos pintados en las caras de los niños durante el evento.",
      precio: 20000,
      icono: "fa-palette"
    },
    {
      id: 4,
      nombre: "Fotografia",
      descripcion: "Captura momentos especiales y crea recuerdos duraderos del evento.",
      precio: 50000,
      icono: "fa-camera-retro"
    },
    {
      id: 5,
      nombre: "Comida Premium",
      descripcion: "Platos de alta calidad con presentación especial, ideales para eventos elegantes.",
      precio: 100000,
      icono: "fa-bowl-food"
    },
    {
      id: 6 ,
      nombre: "Candy Bar",
      descripcion: "Mesa decorada con variedad de dulces, chocolates y golosinas para los invitados.",
      precio: 90000,
      icono: "fa-candy-cane"
    }
  ];
  
  
  // Inicialización de localStorage
  // Si localStorage está vacío, guarda los datos de const salonesIniciales
  export function inicializarLocalStorage() {
    if (!localStorage.getItem("servicios")) {
      localStorage.setItem("servicios", JSON.stringify(serviciosIniciales));
    }
  }
  
  // Devuelve el array actual de salones
  export function obtenerServicios() {
    return JSON.parse(localStorage.getItem("servicios")) || [];
  }
  
  // Guarda un nuevo array de salones en localStorage
  export function guardarServicios(servicios) {
    localStorage.setItem("servicios", JSON.stringify(servicios));
  }
  
  
