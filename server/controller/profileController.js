// server/controller/profileController.js
const User = require('../models/userModel'); // Single model for buyers & sellers

// Fetch the authenticated user's profile
const getMyProfile = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            const error = new Error('User not authenticated or user ID missing.');
            error.status = 401;
            throw error;
        }

        // Fetch user without password field
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            const error = new Error('User profile not found.');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: user
        });

    } catch (error) {
        next(error);
    }
};

// Update the authenticated user's profile
const updateMyProfile = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            const error = new Error('User not authenticated or user ID missing.');
            error.status = 401;
            throw error;
        }

        const updates = req.body;
        const disallowedUpdates = ['password', 'email', '_id', '__v', 'createdAt', 'updatedAt'];
        const filteredUpdates = {};

        // Prevent sensitive fields from being updated
        for (const key in updates) {
            if (!disallowedUpdates.includes(key)) {
                filteredUpdates[key] = updates[key];
            }
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            filteredUpdates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            const error = new Error('User not found during update.');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = new Error(error.message);
            err.status = 400;
            return next(err);
        }
        next(error);
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile
};
