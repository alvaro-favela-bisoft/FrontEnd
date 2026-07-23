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

            <button class="consultar" onclick="consultarSala()">
                Consultar
            </button>

            <button class="guardar" onclick="guardarSala()">
                Guardar
            </button>

            <button class="actualizar" onclick="actualizarSala()">
                Actualizar
            </button>

            <button class="eliminar" onclick="eliminarSala()">
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

    const response = await fetch(`${API}/salas/${id}`, {

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }

    });

    if (!response.ok) {

        alert(await response.text());
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

            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")

        },

        body: JSON.stringify(sala)

    });

    if (response.ok) {

        const resultado = await response.json();

        alert(`Sala registrada correctamente.\nID: ${resultado.id}`);

        limpiarSala();

    }
    else {

        alert(await response.text());

    }

}

async function actualizarSala() {

    const id = document.getElementById("salaId").value;

    if (id == "") {

        alert("Ingrese un ID");
        return;

    }

    const sala = {

        nombre: document.getElementById("nombreSala").value

    };

    const response = await fetch(`${API}/salas/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")

        },

        body: JSON.stringify(sala)

    });

    const texto = await response.text();

    if (response.ok) {

        alert("Sala actualizada correctamente");

    }
    else {

        alert("Error " + response.status + "\n" + texto);

    }

}

async function eliminarSala() {

    const id = document.getElementById("salaId").value;

    if (id == "") {

        alert("Ingrese un ID");
        return;

    }

    if (!confirm("¿Desea eliminar esta sala?"))
        return;

    const response = await fetch(`${API}/salas/${id}`, {

        method: "DELETE",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token")

        }

    });

    if (response.ok) {

        alert("Sala eliminada correctamente");

        limpiarSala();

    }
    else {

        alert(await response.text());

    }

}

function limpiarSala() {

    document.getElementById("salaId").value = "";
    document.getElementById("nombreSala").value = "";

}