//--------------------------------------------------
// FECHA Y HORA
//--------------------------------------------------

function actualizarHora() {

    const ahora = new Date();

    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const segundos = String(ahora.getSeconds()).padStart(0, "0");

    document.getElementById("hora").textContent =
        `${horas}:${minutos}:${segundos}`;

}

function actualizarFecha() {

    const ahora = new Date();

    const opciones = {

        weekday: "long",
        day: "numeric",
        month: "long"

    };

    let fecha = ahora.toLocaleDateString(
        "es-CO",
        opciones
    );

    fecha =
        fecha.charAt(0).toUpperCase() +
        fecha.slice(1);

    document.getElementById("fecha").textContent =
        fecha;

}

function actualizarFechaHora() {

    actualizarFecha();
    actualizarHora();

}

//--------------------------------------------------
// USUARIO
//--------------------------------------------------

function actualizarUIUsuario() {

    const usuario = obtenerUsuario();

    const nombre =
        document.getElementById("usuarioNombre");

    const btnLogin =
        document.getElementById("btnLogin");

    if (!nombre || !btnLogin) return;

    if (usuario) {

        nombre.textContent =
            usuario.name || usuario.username;

        btnLogin.style.display = "none";

    }
    else {

        nombre.textContent = "";

        btnLogin.style.display = "inline-block";

    }

}
