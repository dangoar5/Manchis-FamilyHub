const CONFIG = {

    CALENDARIO_FAMILIAR:
        "AAMkAGQ5YmNmY2JkLTcwNmYtNGU4Ni1iOWViLWE2YjA0NmZmYTYxYwBGAAAAAABiAVA9PgvhT7yTnnemO4kCBwCIofpq2MUBRamF5N4uPjpTAAAAAAEGAACIofpq2MUBRamF5N4uPjpTAAL3gaO1AAA=",

    GRUPO_FAMILY_HUB:
        "23145c1b-d8ff-49a8-9914-070307bfc74b",

    PLAN_FAMILY_HUB:
        "511cpfKBOEawXCu3ShatmGUAG54a",

    BUCKET_MERCADO:
        "YL9JQelmXEy3fVnuKdcWGGUAPK6f",

    BUCKET_TAREAS:
    "b1--r6WGGkW9EtdDDeMMkGUAHHOz",

    SCOPES: [
        "User.Read",
        "Calendars.Read",
        "Tasks.ReadWrite",
        "Group.Read.All"

        
    ],
    
    USUARIOS: {
    DANIEL: "8eea1919-be0a-4221-9926-6b27c1f4f80b",
    ESPOSA: "c970e942-a303-4ecf-be00-faf88d2ecb41"
}

};

// Configuración de MSAL v2 (Sin métodos de inicialización asíncronos)
const msalConfig = {
    auth: {
        clientId: "TU_CLIENT_ID_DE_AZURE", // ⚠️ REEMPLAZA CON TU CLIENT ID REAL
        authority: "https://microsoftonline.com",
        redirectUri: window.location.origin + window.location.pathname // Funciona en Localhost y GitHub Pages
    },
    cache: {
        cacheLocation: "localStorage", // Mantiene la sesión viva en celulares
        storeAuthStateInCookie: true   // Evita bloqueos en Safari (iPhone) e Incógnito
    }
};
