const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAccount = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ email, password: hashedPassword, name: name || email.split('@')[0] });
        await user.save();
        
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'default_jwt_secret',
            { expiresIn: '30d' }
        );
        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Create account error", error);
        res.status(500).json({ message: "Failed to create account" });
    }
};

module.exports = createAccount;