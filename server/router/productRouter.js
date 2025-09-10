// server/router/productRouter.js

const express = require('express');
const router = express.Router();
const productController = require('../controller/productController'); // You'll need to create this controller file
const { authenticateUser } = require('../middleware/authMiddleware'); // Import the auth middleware

// Example Product Routes:

// GET all products (might not require authentication if it's a public listing)
router.get('/products', productController.getAllProducts);

// GET a single product by ID (might not require authentication)
router.get('/products/:id', productController.getProductById);

// POST create a new product (requires authentication and potentially authorization for sellers)
// You might add an authorization middleware here, e.g., authorizeRole(['seller'])
router.post('/products', authenticateUser, productController.createProduct);

// PUT update an existing product by ID (requires authentication and authorization)
router.put('/products/:id', authenticateUser, productController.updateProduct);

// DELETE a product by ID (requires authentication and authorization)
router.delete('/products/:id', authenticateUser, productController.deleteProduct);

module.exports = router; // Export the router using CommonJS
