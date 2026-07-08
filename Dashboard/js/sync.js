let sincronizando = false;

//--------------------------------------------------
// SINCRONIZACIÓN GENERAL
//--------------------------------------------------

async function sincronizarTodo() {

    if (sincronizando) return;

    sincronizando = true;

    const boton = document.getElementById("btnActualizar");

    if (boton) {

        boton.classList.add("btn-sync");

    }

    mostrarEstadoSync("Sincronizando...", false);

    try {

        await Promise.all([
            cargarAgenda(),
            cargarTareasPlanner(),
            cargarMercado()
        ]);
        
        actualizarResumenHeader();

        mostrarEstadoSync("Sincronizado", true);

    }
    catch (error) {

        console.error(error);

        mostrarEstadoSync("Error", false);

    }
    finally {

        sincronizando = false;

        if (boton) {

            boton.classList.remove("btn-sync");

        }

    }

}

//--------------------------------------------------
// AUTOREFRESH
//--------------------------------------------------

function iniciarSincronizacionAutomatica() {

    setInterval(sincronizarTodo,30000);

}

//--------------------------------------------------
// VISIBILITY
//--------------------------------------------------

document.addEventListener("visibilitychange",function(){

    if(!document.hidden){

        sincronizarTodo();

    }

});

//--------------------------------------------------
// ESTADO
//--------------------------------------------------

function mostrarEstadoSync(texto,ok){

    const lbl=document.getElementById("estadoSync");

    if(!lbl)return;

    const hora=new Date().toLocaleTimeString([],{

        hour:"2-digit",
        minute:"2-digit"

    });

    lbl.textContent=

        (ok?"🟢 ":"🟠 ")

        +texto

        +" · "

        +hora;

}