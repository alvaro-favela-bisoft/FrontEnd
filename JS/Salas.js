function mostrarSalas() {
    document.getElementById("contenido").innerHTML = `
    <div class="card">
        <h2>CRUD Salas</h2>
        <label>ID</label>
        <input
            id="salaId"
            type="text"
            placeholder="Ingrese el ID de la sala">

        <label>Nombre de la Sala</label>
        <input
            id="nombreSala"
            type="text"
            placeholder="Ej: Consultorio 101">

        <div class="botones">
            <button
                class="consultar"
                onclick="consultarSala()">
                Consultar
            </button>
            <button
                class="guardar"
                onclick="guardarSala()">
                Guardar
            </button>
            <button
                class="actualizar"
                onclick="actualizarSala()">
                Actualizar
            </button>
            <button
                class="eliminar"
                onclick="eliminarSala()">
                Eliminar
            </button>
        </div>
    </div>
    `;
}

async function consultarSala() {
    const id = document.getElementById("salaId").value;
    if (id == "") {
        alert("Ingrese un ID");
        return;
    }

    const response = await fetch(`${API}/salas/${id}`);
    if (!response.ok) {
        alert("Sala no encontrada");
        return;
    }

    const sala = await response.json();
    document.getElementById("nombreSala").value = sala.nombre;
}

async function guardarSala() {
    const sala = {
        nombre: document.getElementById("nombreSala").value
    };

    const response = await fetch(`${API}/salas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sala)
    });

    if (response.ok) {
        alert("Sala registrada correctamente");
        limpiarSala();
    } else {
        alert(await response.text());
    }
}

async function actualizarSala() {
    const id = document.getElementById("salaId").value;
    if (id == "") {
        alert("Ingrese un ID para actualizar");
        return;
    }

    const sala = {
        nombre: document.getElementById("nombreSala").value
    };

    const response = await fetch(`${API}/salas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sala)
    });

    if (response.ok) {
        alert("Sala actualizada correctamente");
        limpiarSala();
    } else {
        alert(await response.text());
    }
}

async function eliminarSala() {
    const id = document.getElementById("salaId").value;
    if (id == "") {
        alert("Ingrese un ID");
        return;
    }

    if (!confirm("¿Desea eliminar esta sala?")) return;

    const response = await fetch(`${API}/salas/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        alert("Sala eliminada correctamente");
        limpiarSala();
    } else {
        alert(await response.text());
    }
}

function limpiarSala() {
    document.getElementById("salaId").value = "";
    document.getElementById("nombreSala").value = "";
}