async function cargarAgenda() {

    const panelAgenda = document.getElementById("agenda-calendario");

    if (!panelAgenda)
        return;

    panelAgenda.innerHTML = "<div class='evento'>Cargando agenda...</div>";

    try {

        const eventos = await obtenerEventos();

        mostrarAgenda(eventos);

    }
    catch (error) {

        console.error(error);

        panelAgenda.innerHTML =
            "<div class='evento'>No fue posible cargar el calendario.</div>";

    }

}

function mostrarAgenda(eventos) {

    const panelAgenda = document.getElementById("agenda-calendario");

    panelAgenda.innerHTML = "";

    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const pasadoManana = new Date(manana);
    pasadoManana.setDate(pasadoManana.getDate() + 1);

    const eventosHoy = [];
    const eventosManana = [];

    eventos.forEach(function(evento){

        if (!evento.start || !evento.start.dateTime)
            return;

        const inicio = new Date(evento.start.dateTime);

        if (inicio >= hoy && inicio < manana)
            eventosHoy.push(evento);

        else if (inicio >= manana && inicio < pasadoManana)
            eventosManana.push(evento);

    });

    if (eventosHoy.length === 0) {

        panelAgenda.innerHTML +=
            "<div class='evento'>✅ Hoy no tienes eventos.</div>";

    }
    else {

        eventosHoy.forEach(function(evento){

            const hora = new Date(evento.start.dateTime)
                .toLocaleTimeString("es-CO",{

                    hour:"2-digit",
                    minute:"2-digit"

                });

            panelAgenda.innerHTML +=
                `<div class="evento">${hora} - ${evento.subject}</div>`;

        });

    }

    panelAgenda.innerHTML += "<hr>";

    if (eventosManana.length === 0) {

        panelAgenda.innerHTML +=
            "<div class='evento'>📅 Mañana no tienes eventos.</div>";

    }
    else {

        panelAgenda.innerHTML +=
            `<div class="evento">📅 Mañana tienes ${eventosManana.length} evento${eventosManana.length>1?"s":""}.</div>`;

    }

}