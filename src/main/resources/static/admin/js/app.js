$(document).ready(function () {
    cargarAlumnos();
    cargarUsuarios();
});

async function cargarAlumnos() {
    const request = await fetch('/listarAlumnos', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const alumnos = await request.json();

    let alumnosArray = '';
    for (let alumno of alumnos) {
        let HTML = '<tr id="' + alumno.id + '"><td>' + alumno.id + '</td>' + '<td>' + alumno.nombre + '</td>' + '<td>' + alumno.nota + '</td>' + '<td>' + alumno.periodo + '</td>' +
            '<td><button type="button" onclick="eliminarAlumno(' + alumno.id + ')">' + "Eliminar" + '</button>' +
            '<a href="editAlumno.html?id='+ alumno.id + '&nombre=' + alumno.nombre + '' + '&nota=' + alumno.nota + '&periodo=' + alumno.periodo +
            '"><button>Editar</button></a></td>' +
            '</tr>';
        alumnosArray = alumnosArray + HTML;
    }
    document.querySelector('#alumnos tbody').outerHTML = alumnosArray;
}

async function cargarUsuarios() {
    const request = await fetch('/listarUsuarios', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const usuarios = await request.json();

    let usuariosArray = '';
    for (let usuario of usuarios) {
        let HTML = '<tr id="' + usuario.id +'"><td>' + usuario.id + '</td>' + '<td>' + usuario.nombre + '</td>' + '<td>' + usuario.contraseña + '</td>' +
            '<td><button type="button" onclick="eliminarUsuario(' + usuario.id + ')">' + "Eliminar" + '</button>' +
            '<a href="editUser.html"><button type="button">Editar</button></a></td>' +
            '</tr>';
        usuariosArray = usuariosArray + HTML;
    }
    document.querySelector('#usuarios tbody').outerHTML = usuariosArray;
}

async function eliminarAlumno(id) {
    const request = await fetch('/eliminarAlumnos/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}

async function eliminarUsuario(id) {
    const request = await fetch('/eliminarUsuarios/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}

async function añadirAlumnos() {
    let datos = {};
    datos.ID = 1;
    datos.nombre = document.getElementById("txtNombreAlumno").value;
    datos.periodo = document.getElementById("txtPeriodoAlumno").value;
    datos.nota = document.getElementById("txtNotaAlumno").value;

    const request = await fetch('/añadirAlumnos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    location.reload();
}

async function añadirUsuario() {
    let datos = {};
    datos.nombre = document.getElementById("txtNombreUsuario").value;
    datos.contraseña = document.getElementById("txtContraseñaUsuario").value;

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

function cerrarModalAlumnos(){
    window.modalAlumnos.close();

    let inputs = document.getElementsByClassName('inputAlumno');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function cerrarModalUsuarios(){

    window.modalUsuarios.close();

    let inputs = document.getElementsByClassName('inputUsuario');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

}

function updateAlumno(){

}