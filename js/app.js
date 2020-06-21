const formularioContactos = document.querySelector('#contacto');

eventListeners();

function eventListeners() {
    // Cuando el formulario de crear o editar se ejecutan
    formularioContactos.addEventListener('submit', leerFormulario);
}

function leerFormulario(e) {
    e.preventDefault();

    //Leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value,
        accion = document.querySelector('#accion').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        //parms texto y clase
        mostrarNotificacion('Todos los Campos son Obligatorios', 'error');

    } else {
        //Pasa la validación, crear llamado a AJAX
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        //console.log(...infoContacto);

        if (accion === 'crear') {
            //Crear contacto
            insertarBD(infoContacto);
        } else {
            //Editar contacto
        }

        mostrarNotificacion('Contacto Creado con Exito', 'exito');
    }
}

//INSERTAR A LA BD VIA AJAX
function insertarBD(datos) {
    //llamado a Ajax

    //crear objeto
    const xhr = new XMLHttpRequest();

    //abrir conexion
    xhr.open('POST', 'includes/modelos/modelo-contacto.php', true);

    //pasar los datos
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            //leemos la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);

            console.log(respuesta.empresa);
        }
    }

    //enviar los datos
    xhr.send(datos);
}

//Notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    //Ocultar y Mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');

            setTimeout(() => {
                notificacion.remove();
            }, 500);

        }, 3000);
    }, 100);
}