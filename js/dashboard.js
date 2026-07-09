//--------------------------------------------------
// DASHBOARD
//--------------------------------------------------

async function actualizarResumenHeader() {

    const resumen = document.getElementById("resumenHeader");

    if (!resumen) return;

    const tareas = await obtenerTareasPlanner();
    const eventos = await obtenerEventos();

    const pendientes = tareas.filter(function (t) {

        return (
            t.bucketId === CONFIG.BUCKET_TAREAS &&
            t.percentComplete !== 100
        );

    }).length;

    const mercado = tareas.filter(function (t) {

        return (
            t.bucketId === CONFIG.BUCKET_MERCADO &&
            t.percentComplete !== 100
        );

    }).length;

    resumen.innerHTML =

        `📅 ${eventos.length} &nbsp;&nbsp;
         ✅ ${pendientes} &nbsp;&nbsp;
         🛒 ${mercado}`;

}