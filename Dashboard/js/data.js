const mercado = JSON.parse(localStorage.getItem("mercado")) || [];

const alertas = JSON.parse(localStorage.getItem("alertas")) || [
    {
        titulo: "Sin alertas",
        descripcion: "Todo está al día."
    }
];