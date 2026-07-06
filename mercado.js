const btnMercado = document.getElementById("btnMercado");

btnMercado.addEventListener("click", function () {

    abrirModal(
        "Nuevo producto",
        "Nombre del producto",
        async function (nombre) {

            if (!nombre) return;

            const ok = await crearProductoMercado(nombre);

            if (ok) {
                cargarMercado();
            }

        },
        "",
        "Agregar"
    );

});

async function cargarMercado() {

    const tareas = await obtenerTareasPlanner();

    const productos = tareas
    .filter(function (tarea) {

        return tarea.bucketId === CONFIG.BUCKET_MERCADO;

    })
    .sort(function (a, b) {

        const aCompleta = a.percentComplete === 100;
        const bCompleta = b.percentComplete === 100;

        if (aCompleta === bCompleta) return 0;

        return aCompleta ? 1 : -1;

    });

    const panel = document.getElementById("mercado");

    panel.innerHTML = "";

    if (productos.length === 0) {

        panel.innerHTML =
            "<div class='evento'>No hay productos.</div>";

        return;

    }

    productos.forEach(function (producto) {

        const div = document.createElement("div");
        div.className = "evento";

        // Comprado

        const check = document.createElement("span");
        check.textContent =
            producto.percentComplete === 100 ? "☑" : "☐";

        check.style.cursor = "pointer";
        check.style.marginRight = "8px";

        check.onclick = async function () {

            const ok = await actualizarEstadoTarea(
                producto.id,
                producto["@odata.etag"],
                producto.percentComplete !== 100
            );

            if (ok) cargarMercado();

        };

        // Nombre

        const nombre = document.createElement("span");
nombre.textContent = producto.title;

if (producto.percentComplete === 100) {

    nombre.style.textDecoration = "line-through";
    nombre.style.opacity = "0.6";

}

        // Editar

        div.ondblclick = function () {

            abrirModal(
                "Editar producto",
                "Nombre",
                async function (nuevoNombre) {

                    const ok =
                        await actualizarTituloTareaPlanner(
                            producto.id,
                            producto["@odata.etag"],
                            nuevoNombre
                        );

                    if (ok) cargarMercado();

                },
                producto.title,
                "Guardar"
            );

        };

        // Eliminar

        const eliminar = document.createElement("span");

        eliminar.textContent =
        producto.percentComplete === 100 ? " ↩" : " 🗑";
        eliminar.style.cursor = "pointer";
        eliminar.style.float = "right";

        eliminar.onclick = function () {

            abrirConfirmacion(
                "Eliminar producto",
                `¿Eliminar "${producto.title}"?`,
                async function () {

                    const ok =
                        await eliminarTareaPlanner(
                            producto.id,
                            producto["@odata.etag"]
                        );

                    if (ok) cargarMercado();

                }
            );

        };

        div.appendChild(check);
        div.appendChild(nombre);
        div.appendChild(eliminar);

        panel.appendChild(div);

    });

}

cargarMercado();