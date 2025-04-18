const express = require('express');
const categoryRouter = express.Router();
const { addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/CategoryCotroller");

// Add New Category
categoryRouter.post('/category', addCategory);

// Get All Categories
categoryRouter.get('/category', getAllCategories);

// Get a Category
categoryRouter.get('/category/:id', getCategoryById);

// Update Category Details
categoryRouter.put('/category/:id', updateCategory);

// Delete Category
categoryRouter.delete('/category/:id', deleteCategory);

module.exports = categoryRouter;
