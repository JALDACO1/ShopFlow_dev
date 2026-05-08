const express = require('express');
const cors = require('cors');

// Instancia principal de la aplicación Express.
const app = express();

// Permite peticiones desde otros orígenes y parsea JSON en el body.
app.use(cors());
app.use(express.json());

// Endpoint simple para comprobar que el servicio está vivo.
app.get("/health", (req, res) => {
    res.json({status: "ok"});
});

// Middleware centralizado para responder errores de forma consistente.
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({error: err.message || "Internal server error"});
});

module.exports = app;



