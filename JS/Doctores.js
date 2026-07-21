function mostrarDoctores() {

    document.getElementById("contenido").innerHTML = `

    <div class="card">

        <h2>CRUD Doctores</h2>

        <label>ID</label>
        <input
            id="doctorId"
            type="text"
            placeholder="Ingrese el ID del doctor">

        <label>Nombre</label>
        <input
            id="nombreDoctor"
            type="text"
            placeholder="Nombre">

        <label>Especialidad</label>
        <input
            id="especialidadDoctor"
            type="text"
            placeholder="Especialidad">

        <div class="botones">

            <button
                class="consultar"
                onclick="consultarDoctor()">

                Consultar

            </button>

            <button
                class="guardar"
                onclick="guardarDoctor()">

                Guardar

            </button>

            <button
                class="actualizar"
                onclick="actualizarDoctor()">

                Actualizar

            </button>

            <button
                class="eliminar"
                onclick="eliminarDoctor()">

                Eliminar

            </button>

        </div>

    </div>

    `;

}
async function consultarDoctor(){

    const id =
        document.getElementById("doctorId").value;

    if(id==""){

        alert("Ingrese un ID");

        return;

    }

    const response =
        await fetch(`${API}/doctores/${id}`);

    if(!response.ok){

        alert("Doctor no encontrado");

        return;

    }

    const doctor =
        await response.json();

    document.getElementById("nombreDoctor").value =
        doctor.nombre;

    document.getElementById("especialidadDoctor").value =
        doctor.especialidad;

}
async function guardarDoctor(){

    const doctor={

        nombre:
            document.getElementById("nombreDoctor").value,

        especialidad:
            document.getElementById("especialidadDoctor").value

    };

    const response =
        await fetch(`${API}/doctores`,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(doctor)

        });

    if(response.ok){

        alert("Doctor registrado correctamente");

        limpiarDoctor();

    }
    else{

        alert(await response.text());

    }

}
async function actualizarDoctor(){

    const id =
        document.getElementById("doctorId").value;

    const doctor={

        nombre:
            document.getElementById("nombreDoctor").value,

        especialidad:
            document.getElementById("especialidadDoctor").value

    };

    const response =
        await fetch(`${API}/doctores/${id}`,{

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(doctor)

        });

    if(response.ok){

        alert("Doctor actualizado");

    }
    else{

        alert(await response.text());

    }

}
async function eliminarDoctor(){

    const id =
        document.getElementById("doctorId").value;

    if(id==""){

        alert("Ingrese un ID");

        return;

    }

    if(!confirm("¿Desea eliminar este doctor?"))
        return;

    const response =
        await fetch(`${API}/doctores/${id}`,{

            method:"DELETE"

        });

    if(response.ok){

        alert("Doctor eliminado");

        limpiarDoctor();

    }
    else{

        alert(await response.text());

    }

}
function limpiarDoctor(){

    document.getElementById("doctorId").value="";

    document.getElementById("nombreDoctor").value="";

    document.getElementById("especialidadDoctor").value="";

}
