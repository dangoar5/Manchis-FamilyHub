//--------------------------------------------------
// CONFIGURACIÓN
//--------------------------------------------------

const menuConfiguracion =
    document.getElementById("menuConfiguracion");

document
.getElementById("btnConfiguracion")
.addEventListener("click",function(e){

    e.stopPropagation();

    menuConfiguracion.classList.toggle("oculto");

});

document.addEventListener("click",function(){

    menuConfiguracion.classList.add("oculto");

});

//--------------------------------------------------
// SINCRONIZAR
//--------------------------------------------------

document
.getElementById("cfgSincronizar")
.onclick=async function(){

    menuConfiguracion.classList.add("oculto");

    await sincronizarTodo();

};

//--------------------------------------------------
// TEMA
//--------------------------------------------------

const modoOscuro=

    localStorage.getItem("modoOscuro")==="1";

if(modoOscuro){

    document.body.classList.add("dark");

}

document
.getElementById("cfgTema")
.onclick=function(){

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "modoOscuro",

        document.body.classList.contains("dark")

        ? "1"

        : "0"

    );

};

//--------------------------------------------------
// LOGOUT
//--------------------------------------------------

document
.getElementById("cfgLogout")
.onclick=async function(){

    await msalInstance.logoutPopup();

    location.reload();

};