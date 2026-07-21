function limpiarContenido() {
    document.getElementById("contenido").innerHTML = "";
}

// Puedes agregar una función para mostrar el módulo seleccionado activo
function mostrarModulo(modulo) {
    // Resaltar el botón activo
    document.querySelectorAll('nav button').forEach(btn => {
        btn.style.opacity = '0.7';
    });
    event.target.style.opacity = '1';
}