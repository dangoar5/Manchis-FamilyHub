function actualizarResumenHeader() {

    const resumen = document.getElementById("resumenHeader");

    if (!resumen) return;

    const tareas =
        document.querySelectorAll("#tareas-planner .evento").length;

    const mercado =
        document.querySelectorAll("#mercado .evento").length;

    const agenda =
        document.querySelectorAll("#agenda-calendario .evento").length;

    resumen.innerHTML =

        `📅 ${agenda} &nbsp;&nbsp;
         ✅ ${tareas} &nbsp;&nbsp;
         🛒 ${mercado}`;

}