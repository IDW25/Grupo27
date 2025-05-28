if(sessionStorage.getItem("usuario")){
    alert("Ya se encuentra logueado!");
    window.location.href = "admin/gestionarSalon.html";
}

const login = document.getElementById("loginUser");

login.addEventListener("submit",function(event){
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    if (usuario === "idwadmin" && contraseña === "abc123"){
        sessionStorage.setItem("usuario", usuario);
        window.location.href = "admin/gestionarSalon.html";

    } else {
        const userError = document.getElementById("userError");
        userError.innerHTML +=  '<p class="text-danger">Usuario y contraseña incorrecta. Por favor ingresa nuevamente.</p>';
    }
})

