const express = require("express");
const {
  addProduct,
  getFeaturedProducts,
  getProductById,
  getProductByTitle,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByBrand,
  getLowStockProducts,
  getAllProducts,
} = require("../controllers/ProductController");

const productRouter = express.Router();

// Add New Product
productRouter.post("/products", addProduct);

// Get All Products
productRouter.get("/products", getAllProducts);

// Get All Products
productRouter.get("/featured-products", getFeaturedProducts);

// Get a product by id
productRouter.get("/products/:id", getProductById);

// Get a product by title
productRouter.get("/products/search/:title", getProductByTitle);

// Update Product Details
productRouter.patch("/products/:id", updateProduct);

// Delete Product
productRouter.delete("/products/:id", deleteProduct);

// Find/query products according to the category
productRouter.get("/category/:category", getProductsByCategory);

// Find/query products according to the brand
productRouter.get("/brand/:brand", getProductsByBrand);

// Find/query products according to the brand
productRouter.get("/lowStockProducts", getLowStockProducts);

module.exports = productRouter;
