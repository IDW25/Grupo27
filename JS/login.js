import { ingreso } from "./authe.js";

if(sessionStorage.getItem("token")){
   alert("Ya se encuentra logueado!");
   window.location.href = "admin/gestionarSalon.html";
};

// Ingreso de usuario y contraseña

const login = document.getElementById("loginUser");

login.addEventListener("submit", async function(event){
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    const usuarioAutenticado = await ingreso(usuario,contraseña);

    if (usuarioAutenticado){
        sessionStorage.setItem("token", usuarioAutenticado.accessToken);
        alert(`Se logueó ${usuario} con éxito!`);
        window.location.href = "admin/gestionarSalon.html";
    } else {
        const userError = document.getElementById("userError");
        userError.innerHTML =  '<p class="text-danger">Usuario y contraseña incorrecta. Por favor ingresa nuevamente.</p>';
        this.reset()
    }   
});

