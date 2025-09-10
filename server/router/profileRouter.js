// server/router/profileRouter.js

const express = require('express');
const router = express.Router();
const { getMyProfile, updateMyProfile } = require('../controller/profileController');
const { authenticateUser } = require('../middleware/authMiddleware'); // ✅ Import authentication middleware

// Route to get the currently authenticated user's profile
// Example: GET /api/v1/profile
router.get('/profile', authenticateUser, getMyProfile); // ✅ PROTECTED

// Route to update the currently authenticated user's profile
// Example: PUT /api/v1/profile
router.put('/profile', authenticateUser, updateMyProfile); // ✅ PROTECTED

module.exports = router;
