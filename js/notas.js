//--------------------------------------------------
// NOTAS
//--------------------------------------------------

const txtNotas = document.getElementById("txtNotas");

let temporizadorNotas = null;

//--------------------------------------------------

async function cargarNotas() {

    if (!txtNotas) return;

    txtNotas.value = await obtenerNotas();

}

//--------------------------------------------------

txtNotas.addEventListener("input", function () {

    clearTimeout(temporizadorNotas);

    temporizadorNotas = setTimeout(async function () {

        const ok = await guardarNotas(txtNotas.value);

        const estado = document.getElementById("estadoNotas");

        if (!estado) return;

        if (ok) {

            estado.textContent = "💾 Guardado";

            setTimeout(function () {

                estado.textContent = "";

            }, 1500);

        }

    }, 2000);

});