
iniciarServicios();



  // LOGIN Y CARGA INICIAL
document.addEventListener("DOMContentLoaded", function () {

    const btnLogin = document.getElementById("btnLogin");

    // Asignar evento al botón inmediatamente (Optimizado para PC y Taps de celular)
    if (btnLogin) {
        btnLogin.addEventListener("click", function (e) {
            e.preventDefault();
            login();
        });
    }

    // Procesar la respuesta de la redirección de Microsoft al cargar/recargar la página
    if (typeof myMSALObj !== "undefined") {
        myMSALObj.handleRedirectPromise()
            .then(function (response) {
                if (response) {
                    // Si viene regresando del login exitoso, activa la cuenta
                    myMSALObj.setActiveAccount(response.account);
                }
                
                // Ejecutar la carga de la interfaz y datos
                actualizarUIUsuario();
                cargarAgenda();
                cargarTareasPlanner();
            })
            .catch(function (error) {
                console.error("Error en la redirección de MSAL:", error);
                actualizarUIUsuario();
            });
    } else {
        actualizarUIUsuario();
    }
});

// Función global de Login obligatoria por Redirección (Evita bloqueo de popups en móviles)
async function login() {
    try {
        await myMSALObj.loginRedirect({
            scopes: CONFIG.SCOPES
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
}

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

