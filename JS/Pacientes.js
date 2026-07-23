function mostrarPacientes() {

    document.getElementById("contenido").innerHTML = `

    <div class="card">

        <h2>CRUD Pacientes</h2>

        <label>ID</label>
        <input
            id="pacienteId"
            type="text"
            placeholder="Ingrese el ID del paciente">

        <label>Nombre</label>
        <input
            id="nombrePaciente"
            type="text"
            placeholder="Nombre completo">

        <label>Condición</label>
        <input
            id="condicionPaciente"
            type="text"
            placeholder="Condición médica">

        <div class="botones">

            <button class="consultar" onclick="consultarPaciente()">
                Consultar
            </button>

            <button class="guardar" onclick="guardarPaciente()">
                Guardar
            </button>

            <button class="actualizar" onclick="actualizarPaciente()">
                Actualizar
            </button>

            <button class="eliminar" onclick="eliminarPaciente()">
                Eliminar
            </button>

        </div>

    </div>

    `;
}

async function consultarPaciente() {

    const id = document.getElementById("pacienteId").value;

    if (id == "") {
        alert("Ingrese un ID");
        return;
    }

    const response = await fetch(`${API}/pacientes/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    console.log("Status:", response.status);

    if (!response.ok) {

        console.log(await response.text());
        alert("Paciente no encontrado");
        return;

    }

    const paciente = await response.json();

    document.getElementById("nombrePaciente").value = paciente.nombre;
    document.getElementById("condicionPaciente").value = paciente.condicion;
}

async function guardarPaciente() {

    const paciente = {

        nombre: document.getElementById("nombrePaciente").value,
        condicion: document.getElementById("condicionPaciente").value

    };

    const response = await fetch(`${API}/pacientes`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")

        },

        body: JSON.stringify(paciente)

    });

    if (response.ok) {

        const resultado = await response.json();

        alert(`Paciente registrado correctamente.\nID: ${resultado.id}`);

        limpiarPaciente();

    }
    else {

        alert(await response.text());

    }

}

async function actualizarPaciente() {

    const id = document.getElementById("pacienteId").value;

    if (id == "") {

        alert("Ingrese un ID");
        return;

    }

    const paciente = {

        nombre: document.getElementById("nombrePaciente").value,
        condicion: document.getElementById("condicionPaciente").value

    };

    const response = await fetch(`${API}/pacientes/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")

        },

        body: JSON.stringify(paciente)

    });

    const texto = await response.text();

    if (response.ok) {

        alert("Paciente actualizado correctamente");

    }
    else {

        alert("Error " + response.status + "\n" + texto);

    }

}

async function eliminarPaciente() {

    const id = document.getElementById("pacienteId").value;

    if (id == "") {

        alert("Ingrese un ID");
        return;

    }

    if (!confirm("¿Desea eliminar este paciente?"))
        return;

    const response = await fetch(`${API}/pacientes/${id}`, {

        method: "DELETE",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token")

        }

    });

    if (response.ok) {

        alert("Paciente eliminado correctamente");

        limpiarPaciente();

    }
    else {

        alert(await response.text());

    }

}

function limpiarPaciente() {

    document.getElementById("pacienteId").value = "";
    document.getElementById("nombrePaciente").value = "";
    document.getElementById("condicionPaciente").value = "";

}