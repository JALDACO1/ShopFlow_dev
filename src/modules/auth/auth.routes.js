const router = require('express').Router();
const controller = require('./auth.controller');

// Rutas de autenticación
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);

module.exports = router;