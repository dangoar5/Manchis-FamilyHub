async function cargarAgenda() {

    const panelAgenda = document.getElementById("agenda-calendario");

    if (!panelAgenda) return;

    const eventos = await obtenerEventos();

    mostrarAgenda(eventos);

}

function mostrarAgenda(eventos) {

    const panelAgenda = document.getElementById("agenda-calendario");
    panelAgenda.innerHTML = "";

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const pasadoManana = new Date(manana);
    pasadoManana.setDate(pasadoManana.getDate() + 1);

    const eventosHoy = [];
    const eventosManana = [];

    eventos.forEach(function (evento) {

        if (!evento.start?.dateTime) return;

        const inicio = new Date(evento.start.dateTime);

        if (inicio >= hoy && inicio < manana) {

            eventosHoy.push(evento);

        } else if (inicio >= manana && inicio < pasadoManana) {

            eventosManana.push(evento);

        }

    });

    // Eventos de hoy

    if (eventosHoy.length === 0) {

        const div = document.createElement("div");
        div.className = "evento";
        div.textContent = "✅ Hoy no tienes eventos.";

        panelAgenda.appendChild(div);

    } else {

        eventosHoy.forEach(function (evento) {

            const div = document.createElement("div");
            div.className = "evento";

            const hora = new Date(evento.start.dateTime).toLocaleTimeString(
                "es-CO",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

            div.textContent = `${hora} - ${evento.subject}`;

            panelAgenda.appendChild(div);

        });

    }

    // Separador

    const hr = document.createElement("hr");
    panelAgenda.appendChild(hr);

    // Resumen de mañana

    const resumen = document.createElement("div");
    resumen.className = "evento";

    if (eventosManana.length === 0) {

        resumen.textContent = "📅 Mañana no tienes eventos.";

    } else if (eventosManana.length === 1) {

        resumen.textContent = "📅 Mañana tienes 1 evento.";

    } else {

        resumen.textContent = `📅 Mañana tienes ${eventosManana.length} eventos.`;

    }

    panelAgenda.appendChild(resumen);

}
