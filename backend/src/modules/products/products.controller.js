const service = require('./products.service');

/**
 * Devuelve una lista paginada de productos activos.
 * - Query params soportados: `page`, `limit`, `category_id`.
 * - Respuesta: objeto con `total`, `page`, `pages` y `products`.
 */
const getAllProducts = async (req, res, next) => {
    try {
        const data = await service.getAll(req.query);
        res.status(200).json(data);
    } catch (error) {
        // Propaga el error al middleware de manejo de errores centralizado.
        next(error);
    }
}

/**
 * Devuelve un producto por su `id` solo si está activo.
 * - Si no existe, el servicio lanza un error con `status = 404`.
 */
const getProductById = async (req, res, next) => {
    try {
        const data = await service.getById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

/**
 * Crea un nuevo producto.
 * - Valida internamente que la categoría exista; si no, devuelve 404.
 * - Devuelve el producto creado con status 201.
 */
const createProduct = async (req, res, next) => {
    try {
        const data = await service.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

/**
 * Actualiza un producto.
 * Nota: la implementación actual del servicio hace "soft delete"
 * marcando el producto inactivo en vez de modificar campos.
 */
const updateProduct = async (req, res, next) => {
    try {
        const data = await service.update(req.params.id, req.body);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

/**
 * Elimina (soft delete) un producto marcándolo como inactivo.
 * - Respuesta: mensaje de confirmación.
 */
const deleteProduct = async (req, res, next) => {
    try {
        const data = await service.deleteProduct(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}