const modal = document.getElementById("modal");
const tituloModal = document.getElementById("modalTitulo");
const inputModal = document.getElementById("modalInput");

const btnAceptar = document.getElementById("btnAceptar");
const btnCancelar = document.getElementById("btnCancelar");

let accionAceptar = null;

//--------------------------------------------------
// MODAL DE TEXTO
//--------------------------------------------------

function abrirModal(
    titulo,
    placeholder,
    accion,
    valor = "",
    textoBoton = "Aceptar"
) {

    const anterior = document.getElementById("modalMensaje");
    if (anterior) anterior.remove();

    inputModal.style.display = "";

    tituloModal.textContent = titulo;

    inputModal.placeholder = placeholder;
    inputModal.value = valor;

    btnAceptar.textContent = textoBoton;

    accionAceptar = accion;

    modal.classList.remove("oculto");

    inputModal.focus();

}

//--------------------------------------------------
// MODAL CONFIRMACIÓN
//--------------------------------------------------

function abrirConfirmacion(titulo, mensaje, accion) {

    const anterior = document.getElementById("modalMensaje");
    if (anterior) anterior.remove();

    tituloModal.textContent = titulo;

    inputModal.style.display = "none";

    const p = document.createElement("p");
    p.id = "modalMensaje";
    p.textContent = mensaje;

    inputModal.parentNode.insertBefore(p, inputModal);

    btnAceptar.textContent = "Aceptar";

    accionAceptar = async function () {

        modal.classList.add("oculto");

        p.remove();

        inputModal.style.display = "";

        await accion();

    };

    modal.classList.remove("oculto");

}

//--------------------------------------------------
// BOTONES
//--------------------------------------------------

btnAceptar.addEventListener("click", async function () {

    if (inputModal.style.display !== "none") {

        const texto = inputModal.value.trim();

        if (!texto) return;

        modal.classList.add("oculto");

        if (accionAceptar) {
            await accionAceptar(texto);
        }

    } else {

        if (accionAceptar) {
            await accionAceptar();
        }

    }

});

btnCancelar.addEventListener("click", function () {

    modal.classList.add("oculto");

    const anterior = document.getElementById("modalMensaje");
    if (anterior) anterior.remove();

    inputModal.style.display = "";

});

//--------------------------------------------------
// TECLADO
//--------------------------------------------------

inputModal.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        btnAceptar.click();
    }

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        btnCancelar.click();
    }

});