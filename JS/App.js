function limpiarContenido() {
    document.getElementById("contenido").innerHTML = "";
}

function mostrarModulo(modulo) {

    document.querySelectorAll("nav button").forEach(btn => {
        btn.style.opacity = "0.7";
    });

    event.target.style.opacity = "1";
}

window.onload = () => {

    document.getElementById("menuPrincipal").style.display = "none";

    document.getElementById("contenido").style.display = "none";
}

function cerrarSesion() {

    localStorage.removeItem("token");

    location.reload();

}