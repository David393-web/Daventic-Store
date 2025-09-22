const Product = require("../models/productModel");

// CREATE PRODUCT
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const sellerId = req.user.id; // from auth middleware

    if (!name || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Product name and price are required" });
    }

    // Handle images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images,
      sellerId,
    });

    res
      .status(201)
      .json({ success: true, message: "Product created successfully", product });
  } catch (error) {
    next(error);
  }
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("sellerId", "username email");
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// GET SELLER PRODUCTS
const getSellerProducts = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const products = await Product.find({ sellerId });
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, product: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSellerProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
