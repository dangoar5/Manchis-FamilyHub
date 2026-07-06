function crearElementoLista(principal, secundario = "") {

    return `
        <div class="elemento-lista">
            <span class="texto-principal">${principal}</span>
            <span class="texto-secundario">${secundario}</span>
        </div>
    `;

}

function mostrarItem(texto, indice) {

    return `
        <div class="item-lista">
            <span>${texto}</span>
            <button onclick="eliminarProducto(${indice})">✕</button>
        </div>
    `;

}
function mostrarAlerta(titulo, descripcion) {

    return `
        <div class="alerta">
            <div class="alerta-titulo">${titulo}</div>
            <div class="alerta-descripcion">${descripcion}
            </div>
        </div>
    `;

}

function mostrarItem(texto, indice) {

    return `
        <div class="item-lista">
            <span>${texto}</span>
            <button onclick="eliminarProducto(${indice})">✕</button>
        </div>
    `;

}