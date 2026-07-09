//--------------------------------------------------
// INICIO
//--------------------------------------------------

document.addEventListener("DOMContentLoaded", async function () {

    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);

    iniciarSincronizacionAutomatica();

    const usuario = obtenerUsuario();

    if (usuario) {

        document.getElementById("usuarioNombre").textContent =
            usuario.name;

        document.getElementById("btnLogin").style.display = "none";

        await sincronizarTodo();

    }

});

//--------------------------------------------------
// LOGIN
//--------------------------------------------------

document.getElementById("btnLogin").addEventListener(
    "click",
    async function () {

        const cuenta = await login();

        if (!cuenta) return;

        document.getElementById("usuarioNombre").textContent =
            cuenta.name;

        document.getElementById("btnLogin").style.display = "none";

        await sincronizarTodo();

    }
);

//--------------------------------------------------
// ACTUALIZAR
//--------------------------------------------------

document.getElementById("btnActualizar").addEventListener(
    "click",
    sincronizarTodo
);

//--------------------------------------------------
// CERRAR SESIÓN
//--------------------------------------------------

document.getElementById("btnLogout").addEventListener(
    "click",
    async function () {

        await msalInstance.logoutPopup();

        location.reload();

    }
);
