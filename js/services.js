const msalConfig = {
    auth: {
        clientId: "5f1530d2-f339-47e1-b957-81ab6576ce38",
        authority: "https://login.microsoftonline.com/599efb1b-cfe8-4b1d-ba53-683e2b9a2864",
        redirectUri: "https://dangoar5.github.io/Manchis-FamilyHub/"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

let currentAccount = null;

//--------------------------------------------------
// LOGIN
//--------------------------------------------------

async function login() {

  async function login() {
    try {
        await myMSALObj.loginRedirect({
            scopes: CONFIG.SCOPES
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
}

async function iniciarServicios() {

    console.log("MSAL listo");

    const usuario = obtenerUsuario();

    if (usuario) {

        console.log("Sesión activa:", usuario.username);

    }

}

function obtenerUsuario() {

    const cuentas = msalInstance.getAllAccounts();

    if (cuentas.length === 0) return null;

    msalInstance.setActiveAccount(cuentas[0]);

    return cuentas[0];

}

//--------------------------------------------------
// CALENDARIOS
//--------------------------------------------------

async function obtenerCalendarios() {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return [];

    const token = await msalInstance.acquireTokenSilent({
        scopes: ["Calendars.Read"],
        account: cuenta
    });

    const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/calendars",
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        }
    );

    const data = await response.json();

    return data.value || [];

}

async function obtenerEventos() {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return [];

    const token = await msalInstance.acquireTokenSilent({
        scopes: ["Calendars.Read"],
        account: cuenta
    });

    const inicio = new Date();
    inicio.setHours(0, 0, 0, 0);

    const fin = new Date(inicio);
    fin.setDate(fin.getDate() + 2);

    const url =
        "https://graph.microsoft.com/v1.0/me/calendars/" +
        CONFIG.CALENDARIO_FAMILIAR +
        "/calendarView" +
        "?startDateTime=" + encodeURIComponent(inicio.toISOString()) +
        "&endDateTime=" + encodeURIComponent(fin.toISOString()) +
        "&$select=subject,start,end" +
        "&$orderby=start/dateTime";

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            Prefer: 'outlook.timezone="SA Pacific Standard Time"'
        }
    });

    const data = await response.json();

    return data.value || [];

}

//--------------------------------------------------
// GRUPOS
//--------------------------------------------------

async function obtenerGrupos() {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return [];

    const token = await msalInstance.acquireTokenSilent({
        scopes: ["Group.Read.All"],
        account: cuenta
    });

    const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/memberOf?$select=id,displayName",
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        }
    );

    const data = await response.json();

    return data.value || [];

}

//--------------------------------------------------
// PLANNER
//--------------------------------------------------

async function obtenerTareasPlanner() {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return [];

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    const response = await fetch(
        `https://graph.microsoft.com/v1.0/planner/plans/${CONFIG.PLAN_FAMILY_HUB}/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        }
    );

    const data = await response.json();

    return (data.value || []).sort(function (a, b) {

        const aCompleta = a.percentComplete === 100;
        const bCompleta = b.percentComplete === 100;

        if (aCompleta === bCompleta) return 0;

        return aCompleta ? 1 : -1;

    });

}

async function obtenerBucketsPlanner() {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return [];

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    const response = await fetch(
        `https://graph.microsoft.com/v1.0/planner/plans/${CONFIG.PLAN_FAMILY_HUB}/buckets`,
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        }
    );

    const data = await response.json();

    return data.value || [];

}

async function crearTareaPlanner(titulo) {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return false;

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    const response = await fetch(
        "https://graph.microsoft.com/v1.0/planner/tasks",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                planId: CONFIG.PLAN_FAMILY_HUB,
                bucketId: CONFIG.BUCKET_ID,
                title: titulo
            })
        }
    );

    return response.ok;

}

async function crearProductoMercado(nombre) {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return false;

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    const response = await fetch(
        "https://graph.microsoft.com/v1.0/planner/tasks",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                planId: CONFIG.PLAN_FAMILY_HUB,
                bucketId: CONFIG.BUCKET_MERCADO,
                title: nombre
            })
        }
    );
const data = await response.json();
console.log(data);
    return response.ok;

}

async function actualizarTituloTareaPlanner(id, etag, titulo) {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return false;

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    const response = await fetch(
        `https://graph.microsoft.com/v1.0/planner/tasks/${id}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json",
                "If-Match": etag
            },
            body: JSON.stringify({
                title: titulo
            })
        }
    );

    return response.ok;

}

async function actualizarEstadoTarea(id, etag, completada) {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return false;

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    const response = await fetch(
        `https://graph.microsoft.com/v1.0/planner/tasks/${id}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json",
                "If-Match": etag
            },
            body: JSON.stringify({
                percentComplete: completada ? 100 : 0
            })
        }
    );

    return response.ok;

}

async function eliminarTareaPlanner(id, etag) {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return false;

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    const response = await fetch(
        `https://graph.microsoft.com/v1.0/planner/tasks/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "If-Match": etag
            }
        }
    );

    return response.ok;

}

//--------------------------------------------------
// RESPONSABLES
//--------------------------------------------------

async function asignarResponsableTareaPlanner(id, etag, userId) {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return false;

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    // Obtener la tarea actual
    const respuesta = await fetch(
        `https://graph.microsoft.com/v1.0/planner/tasks/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        }
    );

    const tarea = await respuesta.json();

    const assignments = {};

    // Marcar todos los responsables actuales para eliminación
    if (tarea.assignments) {

        Object.keys(tarea.assignments).forEach(function (idActual) {

            assignments[idActual] = null;

        });

    }

    // Agregar el nuevo responsable (si existe)
    if (userId) {

        assignments[userId] = {
            "@odata.type": "microsoft.graph.plannerAssignment",
            orderHint: " !"
        };

    }

    const response = await fetch(
        `https://graph.microsoft.com/v1.0/planner/tasks/${id}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json",
                "If-Match": tarea["@odata.etag"]
            },
            body: JSON.stringify({
                assignments: assignments
            })
        }
    );

    return response.ok;

}

async function desasignarResponsableTareaPlanner(id, etag) {

    return await asignarResponsableTareaPlanner(
        id,
        etag,
        null
    );

}

async function crearBucketPlanner(nombre) {

    const cuenta = msalInstance.getActiveAccount();

    if (!cuenta) return null;

    const token = await msalInstance.acquireTokenSilent({
        scopes: CONFIG.SCOPES,
        account: cuenta
    });

    const response = await fetch(
        "https://graph.microsoft.com/v1.0/planner/buckets",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nombre,
                planId: CONFIG.PLAN_FAMILY_HUB,
                orderHint: " !"
            })
        }
    );

    const data = await response.json();

    console.log(data);

    return data;

}
