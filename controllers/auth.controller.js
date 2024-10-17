const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/auth.model');

// Signup function
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await User.createUser(name, email, hashedPassword);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error during signup.' });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate a JWT token (use process.env.JWT_SECRET instead of hardcoding the secret)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error during login.' });
    }
};

module.exports = { signup, login };
