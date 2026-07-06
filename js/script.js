
iniciarServicios();


// LOGIN
document.addEventListener("DOMContentLoaded", async function () {

    // 1. Procesar la respuesta tras volver de la pantalla de inicio de sesión de Microsoft
    try {
        if (typeof myMSALObj !== "undefined") {
            const response = await myMSALObj.handleRedirectPromise();
            if (response) {
                myMSALObj.setActiveAccount(response.account);
            }
        }
    } catch (error) {
        console.error("Error procesando autenticación:", error);
    }

    // 2. Evento del botón para el clic/tap en móvil
    const btnLogin = document.getElementById("btnLogin");
    if (btnLogin) {
        btnLogin.addEventListener("click", function (event) {
            event.preventDefault(); // Evita recargas inesperadas en móviles
            login();
        });
    }

    // 3. Actualizar la vista del usuario y la agenda
    actualizarUIUsuario();
    cargarAgenda();
});

    cargarTareasPlanner();
    
    const btnNuevaTarea = document.getElementById("btnNuevaTarea");

if (btnNuevaTarea) {

    btnNuevaTarea.addEventListener("click", async function () {

        abrirModal(
    "Nueva tarea",
    "Título de la tarea",
    async function (titulo) {

        if (!titulo) return;

        const ok = await crearTareaPlanner(titulo);

        if (ok) {
            cargarTareasPlanner();
        } else {
            alert("No fue posible crear la tarea.");
        }

    }
);

    });

}

});

