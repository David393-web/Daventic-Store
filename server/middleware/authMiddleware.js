const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    let token;

    // Check for Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token found
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // Find user from DB
        req.user = await User.findById(decoded.userId).select('-password'); // use userId if that's what you used

        if (!req.user) {
            return res.status(401).json({ message: 'User not found or token invalid' });
        }

        next(); // Proceed if everything is fine
    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        return res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
};

module.exports = { authenticateUser };
