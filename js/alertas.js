const panelAlertas = document.getElementById("alertas");

actualizarAlertas();

alertas.forEach(function(alerta) {

    panelAlertas.innerHTML += mostrarAlerta(
        alerta.titulo,
        alerta.descripcion
    );

});
const btnAlertas = document.getElementById("btnAlertas");
btnAlertas.addEventListener("click", function () {

    abrirModal(
        "Nueva alerta",
        "Escribe la alerta...",
        function () {
if (
    alertas.length === 1 &&
    alertas[0].titulo === "Sin alertas"
) {
    alertas.length = 0;
}
            alertas.push({
                titulo: inputModal.value,
                descripcion: ""
            });

            actualizarAlertas();

        }
    );

});

function actualizarAlertas() {

    panelAlertas.innerHTML = "";

    alertas.forEach(function (alerta) {

        panelAlertas.innerHTML += mostrarAlerta(
            alerta.titulo,
            alerta.descripcion
        );

    });
localStorage.setItem("alertas", JSON.stringify(alertas));
}

actualizarAlertas();

