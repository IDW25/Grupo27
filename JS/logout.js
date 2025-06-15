document.addEventListener("DOMContentLoaded", () =>{
    if(!sessionStorage.getItem("token")){
    window.location.href = "../login.html";
    return;
    }
    // Mostrar el contenido si está logueado
    document.body.classList.remove("ocultar");
});


//Para cerrar sesión

const logoutButtons = document.querySelectorAll(".logout");

logoutButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "../login.html";
  });
});