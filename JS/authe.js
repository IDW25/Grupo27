// Autenticación del usuario y contraseña en la API externa

export async function ingreso(usuario,contraseña) {
    try{
        const response = await fetch ("https://dummyjson.com/auth/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username : usuario,
                password : contraseña
            })
        });
        if (!response.ok){
            console.error("Credenciales incorrectas");
            return false
        }

        const listaUsuarios = await response.json()
        return listaUsuarios
    }  catch(error){
        console.error("Error en la solicitud");
        return false
    }
}   