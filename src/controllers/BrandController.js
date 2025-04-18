const Brand = require('../models/BrandModel');

// Add New Brand
exports.addBrand = async (req, res) => {
    try {
        const brand = await Brand.create(req.body);
        res.status(201).json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Brands
exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a Brand
exports.getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById(id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Brand Details
exports.updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.json(updatedBrand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Brand
exports.deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBrand = await Brand.findByIdAndDelete(id);
        if (!deletedBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
