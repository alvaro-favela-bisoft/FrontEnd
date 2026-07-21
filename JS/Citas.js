function mostrarCitas() {
    document.getElementById("contenido").innerHTML = `
    <div class="card">
        <h2>CRUD Citas</h2>
        <label>ID</label>
        <input
            id="citaId"
            type="text"
            placeholder="Ingrese el ID de la cita">

        <label>Fecha y Hora</label>
        <input
            id="fechaCita"
            type="datetime-local"
            placeholder="Fecha y hora">

        <label>ID del Paciente</label>
        <input
            id="pacienteIdCita"
            type="text"
            placeholder="ID del paciente">

        <label>ID del Doctor</label>
        <input
            id="doctorIdCita"
            type="text"
            placeholder="ID del doctor">

        <label>ID de la Sala</label>
        <input
            id="salaIdCita"
            type="text"
            placeholder="ID de la sala">

        <label>Motivo</label>
        <input
            id="motivoCita"
            type="text"
            placeholder="Motivo de la cita">

        <div class="botones">
            <button
                class="consultar"
                onclick="consultarCita()">
                Consultar
            </button>
            <button
                class="guardar"
                onclick="guardarCita()">
                Guardar
            </button>
            <button
                class="actualizar"
                onclick="actualizarCita()">
                Actualizar
            </button>
            <button
                class="eliminar"
                onclick="eliminarCita()">
                Eliminar
            </button>
        </div>
    </div>
    `;
}

async function consultarCita() {
    const id = document.getElementById("citaId").value;
    if (id == "") {
        alert("Ingrese un ID");
        return;
    }

    const response = await fetch(`${API}/citas/${id}`);
    if (!response.ok) {
        alert("Cita no encontrada");
        return;
    }

    const cita = await response.json();
    // Formatear fecha para el input datetime-local
    const fecha = new Date(cita.fecha);
    const fechaFormateada = fecha.toISOString().slice(0, 16);
    
    document.getElementById("fechaCita").value = fechaFormateada;
    document.getElementById("pacienteIdCita").value = cita.pacienteId;
    document.getElementById("doctorIdCita").value = cita.doctorId;
    document.getElementById("salaIdCita").value = cita.salaId;
    document.getElementById("motivoCita").value = cita.motivo;
}

async function guardarCita() {
    const cita = {
        fecha: document.getElementById("fechaCita").value,
        pacienteId: document.getElementById("pacienteIdCita").value,
        doctorId: document.getElementById("doctorIdCita").value,
        salaId: document.getElementById("salaIdCita").value,
        motivo: document.getElementById("motivoCita").value
    };

    // Validar que todos los campos estén llenos
    if (!cita.fecha || !cita.pacienteId || !cita.doctorId || !cita.salaId || !cita.motivo) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const response = await fetch(`${API}/citas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cita)
    });

    if (response.ok) {
        const resultado = await response.json();
        alert(`Cita registrada correctamente. ID: ${resultado.id}`);
        limpiarCita();
    } else {
        alert(await response.text());
    }
}

async function actualizarCita() {
    const id = document.getElementById("citaId").value;
    if (id == "") {
        alert("Ingrese un ID para actualizar");
        return;
    }

    const cita = {
        fecha: document.getElementById("fechaCita").value,
        motivo: document.getElementById("motivoCita").value
    };

    // Validar que fecha y motivo estén llenos
    if (!cita.fecha || !cita.motivo) {
        alert("Fecha y motivo son obligatorios");
        return;
    }

    const response = await fetch(`${API}/citas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cita)
    });

    if (response.ok) {
        alert("Cita actualizada correctamente");
        limpiarCita();
    } else {
        alert(await response.text());
    }
}

async function eliminarCita() {
    const id = document.getElementById("citaId").value;
    if (id == "") {
        alert("Ingrese un ID");
        return;
    }

    if (!confirm("¿Desea eliminar esta cita?")) return;

    const response = await fetch(`${API}/citas/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        alert("Cita eliminada correctamente");
        limpiarCita();
    } else {
        alert(await response.text());
    }
}

function limpiarCita() {
    document.getElementById("citaId").value = "";
    document.getElementById("fechaCita").value = "";
    document.getElementById("pacienteIdCita").value = "";
    document.getElementById("doctorIdCita").value = "";
    document.getElementById("salaIdCita").value = "";
    document.getElementById("motivoCita").value = "";
}