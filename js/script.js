
iniciarServicios();


// LOGIN
document.addEventListener("DOMContentLoaded", async function () {

    // 1. Procesar la respuesta tras volver de la pantalla de inicio de sesión de Microsoft
   document.addEventListener("DOMContentLoaded", async function () {

    try {
        // 1. Inicialización obligatoria para MSAL v2+
        await myMSALObj.initialize();

        // 2. Procesar la respuesta del login al regresar de Microsoft
        const response = await myMSALObj.handleRedirectPromise();
        if (response) {
            myMSALObj.setActiveAccount(response.account);
        }
    } catch (error) {
        console.error("Error durante la inicialización de MSAL:", error);
    }

    // 3. Asignar el evento al botón de inicio de sesión
    const btnLogin = document.getElementById("btnLogin");
    if (btnLogin) {
        btnLogin.addEventListener("click", async function (e) {
            e.preventDefault();
            await login();
        });
    }

    // 4. Cargar la interfaz y los datos de la agenda
    actualizarUIUsuario();
    cargarAgenda();
    cargarTareasPlanner();
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

