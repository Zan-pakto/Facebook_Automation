const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if user has a password (they might have only logged in with FB before)
        if (!user.password) {
            return res.status(401).json({ message: 'Account created with Facebook. Please connect Facebook or create a password.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'default_jwt_secret',
            { expiresIn: '30d' }
        );

        res.json({ token, user });
    } catch (error) {
        console.error("Login error", error);
        res.status(500).json({ message: "Failed to login" });
    }
};

module.exports = login;
