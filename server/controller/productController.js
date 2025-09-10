const Product = require("../models/productModel");

// ============ CREATE PRODUCT ============
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !price) {
      const err = new Error("Product name and price are required");
      err.status = 400;
      throw err;
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// ============ GET ALL PRODUCTS ============
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// ============ GET SINGLE PRODUCT ============
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// ============ UPDATE PRODUCT ============
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      const err = new Error("Product not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ success: true, product: updated });
  } catch (error) {
    next(error);
  }
};

// ============ DELETE PRODUCT ============
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      const err = new Error("Product not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
