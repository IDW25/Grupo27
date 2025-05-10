const botonesVerDetalles = document.querySelectorAll('a.btn-full');

botonesVerDetalles.forEach(boton => {
  boton.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'detalleSalon.html';
  });
});