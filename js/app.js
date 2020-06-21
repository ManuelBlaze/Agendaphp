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
        telefono = document.querySelector('#nombre').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        //parms texto y clase
        mostrarNotificacion('Todos los Campos son Obligatorios', 'error');

    } else {
        mostrarNotificacion('Contacto Creado con Exito', 'exito');
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