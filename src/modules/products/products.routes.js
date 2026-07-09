const router      = require('express').Router();
const controller  = require('./products.controller');
const verifyToken = require('../../middlewares/auth');
const requireRole = require('../../middlewares/role');

// Rutas públicas
router.get('/',    controller.getAllProducts);
router.get('/:id', controller.getProductById);

// Rutas protegidas — solo admin
router.post('/',      verifyToken, requireRole('admin'), controller.createProduct);
router.put('/:id',    verifyToken, requireRole('admin'), controller.updateProduct);
router.delete('/:id', verifyToken, requireRole('admin'), controller.deleteProduct);

module.exports = router;