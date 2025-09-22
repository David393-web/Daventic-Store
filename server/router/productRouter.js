const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSellerProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController"); // now this works ✅
const { authenticateUser } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


router.post("/products/upload", authenticateUser, upload.array("images", 5), createProduct);
router.get("/products/seller", authenticateUser, getSellerProducts);
router.put("/products/:id", authenticateUser, updateProduct);
router.delete("/products/:id", authenticateUser, deleteProduct);
router.get("/products", authenticateUser, getAllProducts);
router.get("/products/:id",authenticateUser, getProductById);


module.exports = router;
