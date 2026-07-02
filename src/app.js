const express = require("express");
const cors = require("cors");

const app = express();

const verifyToken = require("./middlewares/auth");

app.use(cors());
app.use(express.json());

// Rutas de autenticación.
app.use("/api/auth", require("./modules/auth/auth.routes"));

// Endpoint simple para comprobar que el servicio está vivo.
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Ruta de prueba para el middleware de auth.
app.get("/api/me", verifyToken, (req, res) => {
  res.json({ message: "Acceso autorizado", user: req.user });
});

// Middleware centralizado de errores — SIEMPRE AL FINAL.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
});

module.exports = app;