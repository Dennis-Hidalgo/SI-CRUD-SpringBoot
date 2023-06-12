let contraseña = document.getElementById('contraseña');

let contraseñaRepetir = document.getElementById('contraseñaRepetir');

let nombre = document.getElementById("nombre'");
console.log(nombre)

let registrarse = document.getElementById('iniciar');


/*
nombre.addEventListener('keyup', function () {
    validarBoton();

});

nombre.addEventListener('keyup', function () {
    validarUsuario();
})

contraseña.addEventListener('keyup', function () {

    validarBoton();

});

contraseñaRepetir.addEventListener('keyup', function () {
    validarContraseñas();
})

let iniciar = document.getElementById('iniciar');

function validarBoton() {
    if (contraseña.value.length > 0 && nombre.value.length > 0) {
        iniciar.disabled = false;
    } else {
        iniciar.disabled = true;
    }
}

const mensajeContraseñas = document.getElementById('mensajeContrasenas');

console.log(mensajeContraseñas)

function validarContraseñas() {

    if (contraseñaRepetir.value.length == 0) {
        mensajeContraseñas.innerHTML = ' ';

    } else {

        let iguales = comprobarContraseñas();

        if (!iguales) {
            mensajeContraseñas.innerHTML = 'Las contraseñas no coinciden'
        } else {
            mensajeContraseñas.innerHTML = 'Las contraseñas coinciden'
        }
    }
}

function comprobarContraseñas() {

    if (contraseñaRepetir.value.length == 0 && contraseña.value != contraseñaRepetir.value) {
        return false;
    } else {
        return true;
    }

}

const mensajeError = document.getElementById('mensajeError');

const mensajeNombre = document.getElementById('mensajeNombre')

async function validarUsuario() {

    let nombreUsuario = document.getElementById('nombre').value;

    try {
        const usuarios = await getUsuarios();

        for (user in usuarios) {

            if (nombreUsuario == usuarios[user].nombre) {
                mensajeNombre.classList.remove('encontrado');
                mensajeNombre.classList.add('noEncontrado');
                mensajeNombre.innerText = 'El usuario ya esta registrado';


            } else {
                mensajeNombre.classList.remove('noEncontrado');
                mensajeNombre.classList.add('encontrado');
                mensajeNombre.innerText = 'El nombre de usuario esta disponible'
            }

        }
    } catch (error) {
        console.log(error)
    }



}



 */

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

async function validarUsuario() {
    valido = false
    let nombreUsuario = document.getElementById('nombre').value;
    try {
        const usuarios = await getUsuarios();
        for (user in usuarios) {
            if (nombreUsuario == usuarios[user].nombre) {
                valido = false
            } else {
                valido = true
            }
        }
    } catch (error) {
        console.log(error)
    }
    return valido
}

async function validarCampos() {
    let pass = document.getElementById('contraseña')['value']
    let pass2 = document.getElementById('contraseñaRepetir')['value']
    let boton = document.getElementById('iniciar')
    let lista = await getUsuarios();

    console.log("FDSfs")

    // Validar nombre
    let nombreValido = await validarUsuario();
    console.log("nombre:", nombreValido)

    // Validar contraseñas
    let contrasenasIguales = pass === pass2;
    console.log("iguales:", contrasenasIguales)

    // Cambiar estado del botón
    if ((nombreValido && contrasenasIguales) && pass.length > 0){
        console.log("b")
        boton.disabled = false;
    } else {
        console.log("a")
        boton.disabled = true;
    }
}

async function añadirUsuario() {
    let datos = {};
    datos.nombre = document.getElementById("nombre").value;
    datos.contraseña = document.getElementById("contraseña").value;

    const request = await fetch('/añadirUsuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    location.reload();

}



