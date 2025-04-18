const express = require('express');
const brandRouter = express.Router();
const {addBrand, getAllBrands, getBrandById, updateBrand, deleteBrand} = require('../controllers/BrandController');

// Add New Brand
brandRouter.post('/brand', addBrand);

// Get All Brands
brandRouter.get('/brands', getAllBrands);

// Get a Brand
brandRouter.get('/brand/:id', getBrandById);

// Update Brand Details
brandRouter.put('/brand/:id', updateBrand);

// Delete Brand
brandRouter.delete('/brand/:id', deleteBrand);

module.exports = brandRouter;
