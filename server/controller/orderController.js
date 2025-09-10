const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// ============ CREATE ORDER ============
const createOrder = async (req, res, next) => {
  try {
    const { userId, products } = req.body;
    if (!userId || !products || !products.length) {
      const err = new Error("User ID and products are required");
      err.status = 400;
      throw err;
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        const err = new Error(`Product not found: ${item.productId}`);
        err.status = 404;
        throw err;
      }
      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      products,
      totalPrice,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// ============ GET USER ORDERS ============
const getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate("products.productId");
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// ============ GET ALL ORDERS ============
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("products.productId");
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// ============ UPDATE ORDER STATUS ============
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      const err = new Error("Order not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// ============ DELETE ORDER ============
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      const err = new Error("Order not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
