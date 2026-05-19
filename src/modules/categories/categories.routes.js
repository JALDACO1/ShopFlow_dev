const express = require('express');
const router = express.Router();
const categoriesController = require('./categories.controller');

// GET all categories
router.get('/', categoriesController.getAllCategories);

// GET category by ID
router.get('/:id', categoriesController.getCategoryById);

// POST create category
router.post('/', categoriesController.createCategory);

// PUT update category
router.put('/:id', categoriesController.updateCategory);

// DELETE category
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
