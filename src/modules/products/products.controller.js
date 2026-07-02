const service = require('./products.service');

const getAllProducts = async (req, res, next) => {
    try {
        const data = await service .getAll(req.query);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const data = await service.getById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    try {
        const data = await service.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const data = await service.update(req.params.id, req.body);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const data = await service.delete(req.params.id);
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