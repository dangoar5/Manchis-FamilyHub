
iniciarServicios();


// LOGIN
document.addEventListener("DOMContentLoaded", function () {

    const btnLogin = document.getElementById("btnLogin");

    if (btnLogin) {
        btnLogin.addEventListener("click", function () {
            login().then(() => {
                actualizarUIUsuario();
            });
        });
    }

    actualizarUIUsuario();

    cargarAgenda();
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

