const db = require('../../models');
const Category = db.Category;

// Get all categories
const getAllCategories = async () => {
  return await Category.findAll();
};

// Get category by ID
const getCategoryById = async (id) => {
  return await Category.findByPk(id);
};

// Create category
const createCategory = async (name, description) => {
  return await Category.create({
    name,
    description,
  });
};

// Update category
const updateCategory = async (id, name, description) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error('Category not found');
  }
  return await category.update({
    name,
    description,
  });
};

// Delete category
const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error('Category not found');
  }
  return await category.destroy();
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
