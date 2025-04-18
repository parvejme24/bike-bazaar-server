const Products = require("../models/ProductModel");

// Add New Product
exports.addProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const searchItems = req?.query?.searchItems || {};

  let brand, minPrice, maxPrice, category;
  try {
    if (typeof searchItems === "string") {
      const parseSearchItems = JSON.parse(searchItems);
      brand = parseSearchItems?.brand;
      category = parseSearchItems?.category;
      minPrice = parseSearchItems?.minPrice;
      maxPrice = parseSearchItems?.maxPrice;
    }
    let matchCriteria = {};

    // Constructing match criteria based on provided filters
    const orConditions = [];
    if (brand && Array.isArray(brand) && brand.length > 0) {
      orConditions.push({ brand: { $in: brand } });
    }
    if (category && Array.isArray(category) && category.length > 0) {
      orConditions.push({ category: { $in: category } });
    }
    if (orConditions.length > 0) {
      matchCriteria.$or = orConditions;
    }
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      matchCriteria.price = { $gte: minPrice, $lte: maxPrice };
    }

    const totalProduct = await Products.countDocuments(matchCriteria);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    if (endIndex < totalProduct) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    const aggregationPipeline = [
      { $match: matchCriteria }, // Filter documents based on match criteria
      { $skip: startIndex },
      { $limit: limit },
    ];

    const products = await Products.aggregate(aggregationPipeline);
    res.json({ products, totalProduct, pagination });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
};




// get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Products.aggregate([
      { $sample: { size: 8 } }, // Shuffle and limit to 8 documents
    ]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get/search product by title
exports.getProductByTitle = async (req, res) => {
  try {
    const encodedTitle = req.params.title;
    const decodedTitle = decodeURIComponent(encodedTitle);
    const regex = new RegExp(decodedTitle, "i");
    const products = await Products.find({ title: regex });
    if (!products) {
      return res.status(401).json({ message: "Product not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product Details
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find/query products according to the category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Products.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find/query products according to the brand
exports.getProductsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const products = await Products.find({ brand });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products with stock limit less than 20
exports.getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Products.find({ quantity: { $lt: 20 } });
    res.status(200).json({ lowStockProducts });
  } catch (error) {
    console.error("Error getting low stock products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
