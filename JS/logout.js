
document.addEventListener("DOMContentLoaded", () =>{
    if(!sessionStorage.getItem("usuario")){
    window.location.href = "../login.html";
    return;
    }
})

//Para cerrar sesión

const logoutButtons = document.querySelectorAll(".logout");

logoutButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "../login.html";
  });
});