async function cargarTareasPlanner() {

    const tareas = await obtenerTareasPlanner();

    const panel = document.getElementById("tareas-planner");
    if (!panel) return;

    panel.innerHTML = "";

    if (!tareas || tareas.length === 0) {
        panel.innerHTML = "<div class='evento'>No hay tareas en Planner</div>";
        return;
    }

    tareas
    .filter(function (tarea) {

        return tarea.bucketId === CONFIG.BUCKET_TAREAS;

    })
    .forEach(function (tarea) {

        const div = document.createElement("div");
        div.className = "evento";

        // CHECK
        const check = document.createElement("span");
        check.textContent = tarea.percentComplete === 100 ? "☑" : "☐";
        check.style.cursor = "pointer";
        check.style.marginRight = "8px";

        check.onclick = async function () {

            const ok = await actualizarEstadoTarea(
                tarea.id,
                tarea["@odata.etag"],
                tarea.percentComplete !== 100
            );

            if (ok) cargarTareasPlanner();
        };

        // TITULO
        const titulo = document.createElement("span");
        titulo.textContent = tarea.title;

        // RESPONSABLE REAL
        const responsable = document.createElement("span");
        responsable.style.marginLeft = "10px";
        responsable.style.fontSize = "12px";
        responsable.style.opacity = "0.75";

        let nombres = [];

        if (tarea.assignments) {
            const ids = Object.keys(tarea.assignments);

            ids.forEach(id => {
                if (id === CONFIG.USUARIOS.DANIEL) nombres.push("Ponchi");
                else if (id === CONFIG.USUARIOS.ESPOSA) nombres.push("Manusexy");
                else nombres.push("Otro");
            });
        }

        responsable.textContent = nombres.length ? ` ${nombres.join(", ")}` : "";

        // EDITAR
        div.ondblclick = function () {

            abrirModal(
                "Editar tarea",
                "Nuevo título",
                async function (nuevoTitulo) {

                    if (!nuevoTitulo) return;

                    const ok = await actualizarTituloTareaPlanner(
                        tarea.id,
                        tarea["@odata.etag"],
                        nuevoTitulo
                    );

                    if (ok) cargarTareasPlanner();
                },
                tarea.title,
                "Guardar"
            );
        };

        // ASIGNAR
        const asignar = document.createElement("span");
        asignar.textContent = " 👥";
        asignar.style.cursor = "pointer";
        asignar.style.marginLeft = "10px";

        asignar.onclick = async function () {

    let userId = null;

    if (!tarea.assignments || Object.keys(tarea.assignments).length === 0) {

        userId = CONFIG.USUARIOS.DANIEL;

    } else if (tarea.assignments[CONFIG.USUARIOS.DANIEL]) {

        userId = CONFIG.USUARIOS.ESPOSA;

    }

    const ok = await asignarResponsableTareaPlanner(
        tarea.id,
        tarea["@odata.etag"],
        userId
    );

    if (ok) cargarTareasPlanner();

};

        // ELIMINAR
        const eliminar = document.createElement("span");
        eliminar.textContent = " 🗑";
        eliminar.style.cursor = "pointer";
        eliminar.style.float = "right";

        eliminar.onclick = function () {

            abrirConfirmacion(
                "Eliminar tarea",
                `¿Eliminar "${tarea.title}"?`,
                async function () {

                    const ok = await eliminarTareaPlanner(
                        tarea.id,
                        tarea["@odata.etag"]
                    );

                    if (ok) cargarTareasPlanner();
                }
            );
        };

        div.appendChild(check);
        div.appendChild(titulo);
        div.appendChild(responsable);
        div.appendChild(asignar);
        div.appendChild(eliminar);

        panel.appendChild(div);

    });
}

//--------------------------------------------------
// NUEVA TAREA
//--------------------------------------------------

const btnNuevaTarea = document.getElementById("btnNuevaTarea");

if (btnNuevaTarea) {

    btnNuevaTarea.addEventListener("click", function () {

        abrirModal(
            "Nueva tarea",
            "Nombre de la tarea",
            async function (nombre) {

                if (!nombre) return;

                const ok = await crearTareaPlanner(nombre);

                if (ok) {

                    await cargarTareasPlanner();
                    await actualizarResumenHeader();

                }

            },
            "",
            "Agregar"
        );

    });

}

