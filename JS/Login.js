async function login() {

    const usuario = document.getElementById("loginUsuario").value;
    const password = document.getElementById("loginPassword").value;

    if (usuario === "" || password === "") {
        alert("Ingrese usuario y contraseña.");
        return;
    }

    const response = await fetch(`${API}/auth/login`, {
        method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        usuario: usuario,
        password: password
    })
});

    if (!response.ok) {

        alert("Usuario o contraseña incorrectos.");

        return;
    }

    const datos = await response.json();

    localStorage.setItem("token", datos.token);

    document.getElementById("loginContainer").style.display = "none";

    document.getElementById("menuPrincipal").style.display = "flex";

    document.getElementById("contenido").style.display = "block";

    alert("Bienvenido.");
}

function mostrarRegistro() {

    document.getElementById("loginContainer").style.display = "none";

    document.getElementById("registroContainer").style.display = "block";

}

function mostrarLogin() {

    document.getElementById("registroContainer").style.display = "none";

    document.getElementById("loginContainer").style.display = "block";

}

async function registrarUsuario() {

    const nombre =
        document.getElementById("registroNombre").value;

    const usuario =
        document.getElementById("registroUsuario").value;

    const password =
        document.getElementById("registroPassword").value;

    if (nombre == "" || usuario == "" || password == "") {

        alert("Todos los campos son obligatorios.");

        return;

    }

    const response = await fetch(`${API}/usuarios`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": "Bearer " + localStorage.getItem("token")

        },

        body: JSON.stringify({

            nombre: nombre,

            usuario: usuario,

            password: password

        })

    });

    if (!response.ok) {

        alert(await response.text());

        return;

    }

    alert("Usuario registrado correctamente.");

    document.getElementById("registroNombre").value = "";

    document.getElementById("registroUsuario").value = "";

    document.getElementById("registroPassword").value = "";

    mostrarLogin();

}