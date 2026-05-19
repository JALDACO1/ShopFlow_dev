const categoriesService = require('./categories.service');

// Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// Get category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoriesService.getCategoryById(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// Create category
const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await categoriesService.createCategory(name, description);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Update category
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await categoriesService.updateCategory(id, name, description);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// Delete category
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoriesService.deleteCategory(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
