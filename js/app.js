const formularioContactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody'),
    inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    // Cuando el formulario de crear o editar se ejecutan
    formularioContactos.addEventListener('submit', leerFormulario);

    //Eliminar el boton
    if (listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }
    if (inputBuscador) {
        inputBuscador.addEventListener('input', buscarContactos);
    }
    numeroContactos();
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
            //Leer id
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
        }
    }
}

//INSERTAR A LA BD VIA AJAX
function insertarBD(datos) {
    //llamado a Ajax

    //crear objeto
    const xhr = new XMLHttpRequest();

    //abrir conexion
    xhr.open('POST', 'includes/modelos/crear-contacto.php', true);

    //pasar los datos
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            //leemos la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta.datos.id_insertado);
            //Inserta un nuevo contacto a la tabla en el index
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //crear contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            //crear el icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen');
            //crear el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn-editar', 'btn');

            //Agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //Crear icono de eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash');
            //Crear boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn-borrar', 'btn');

            //Agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);

            //Agregarlo el tr
            nuevoContacto.appendChild(contenedorAcciones);

            //Agregarlo con los contactos
            listadoContactos.appendChild(nuevoContacto);

            //Resetear el Form
            document.querySelector('form').reset();

            //Mostrar notificacion
            mostrarNotificacion('Contacto Creado Correctamente', 'exito');

            //Actualizar el número
            numeroContactos();
        }
    }

    //enviar los datos
    xhr.send(datos);
}

//Actualizar contacto
function actualizarRegistro(datos) {
    //Llamado a AJAX
    //Crear objeto
    const xhr = new XMLHttpRequest();

    //Abrir Conexion
    xhr.open('POST', 'includes/modelos/editar-contacto.php', true);

    //Leer respuesta
    xhr.onload = function () {
        if (this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);

            if (respuesta.respuesta === 'correcto') {
                //mostrar notificacion de Correcto
                mostrarNotificacion('Contacto Editado Correctamente', 'exito');
            } else {
                //hubo un error
                mostrarNotificacion('Hubo un Error...', 'error');
            }

            //Después de 3 s redireccionar
            setTimeout(() => {
                window.location.href = 'index.php'
            }, 2000);
        }
    }

    //Enviar la peticion
    xhr.send(datos);
}

//Eliminar un contacto
function eliminarContacto(e) {
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        //Tomar el id
        const id = e.target.parentElement.getAttribute('data-id');
        // console.log(id);
        //preguntar al usuario
        const respuesta = confirm('¿Deseas BORRAR el Contacto?');
        if (respuesta) {
            //Llamado a AJAX
            //Crear objeto
            const xhr = new XMLHttpRequest();

            //Abrir Conexion
            xhr.open('GET', `includes/modelos/borrar-contacto.php?id=${id}&accion=borrar`, true);

            //Leer respuesta
            xhr.onload = function () {
                if (this.status === 200) {
                    const resultado = JSON.parse(xhr.responseText);

                    if (resultado.respuesta === 'correcto') {
                        //Eliminar el registro del DOM
                        e.target.parentElement.parentElement.parentElement.remove();

                        //Mostrar Notificación
                        mostrarNotificacion('Contacto Eliminado', 'exito');

                        //Actualizar el número
                        numeroContactos();
                    } else {
                        //mostrar Notificación
                        mostrarNotificacion('Hubo un Error....', 'error');
                    }
                }
            }

            //Enviar la peticion
            xhr.send();
        }
    }
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

//Buscador de Registros
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i"),
        registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => {
        registro.style.display = 'none';

        if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {
            registro.style.display = 'table-row';
        }
        numeroContactos();
    });

}

//Mostrar número de contactos visibles
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
        contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto => {
        if (contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        }
    });
    contenedorNumero.textContent = total;
}