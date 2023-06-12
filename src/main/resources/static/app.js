

let contraseña = document.getElementById('contraseña');


let nombre = document.getElementById('nombre');

/*
nombre.addEventListener('keyup',function(){
        validarBoton();
});

 */

nombre.setAttribute("onkeyup", "validarBoton()");
contraseña.setAttribute("onkeyup", "validarBoton()");
/*
contraseña.addEventListener('keyup',function(){
        validarBoton();
});

 */

let iniciar = document.getElementById('iniciar');

let imagen = document.getElementById('ojoVisible');
function validarBoton(){
    if(contraseña.value.length > 0 && nombre.value.length > 0){
        iniciar.disabled = false;
    }else{
        iniciar.disabled = true;
    }
}

const mensajeError = document.getElementById('mensajeError');

async function validarUsuario(){

    let nombreUsuario = document.getElementById('nombre').value;

    let contraseñaUsuario = document.getElementById('contraseña').value;

    try{
        const usuarios = await getUsuarios();

        for (user in usuarios) {

            if(nombreUsuario == usuarios[user].nombre && contraseñaUsuario == usuarios[user].contraseña){
                mensajeError.classList.remove('noEncontrado');
                mensajeError.classList.add('encontrado');
                mensajeError.innerText = 'Bienvenido ' + nombreUsuario;
                if (nombreUsuario == "admin"){
                    location.href = "admin/admin.html";
                } else {
                    location.href = "user/index.html";
                }
            }else{
                mensajeError.classList.remove('encontrado');
                mensajeError.classList.add('noEncontrado');
                mensajeError.innerText = 'No se encontro a este usuario'
            }

        }
    }catch (error){
        console.log(error)
    }

}

async function getUsuarios() {
    const request = await fetch('/listarUsuarios', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const usuarios = await request.json();
    return usuarios;

}