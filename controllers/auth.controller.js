const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/auth.model');

// Signup function
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if the email already exists
    User.findUserByEmail(email, (err, user) => {
        if (user) {
            return res.status(400).send('Email already registered.');
        }
        
        // Create a new user
        User.createUser(name, email, password, (err, result) => {
            if (err) return res.status(500).send('Error during signup.');
            res.status(201).send('User registered successfully');
        });
    });
};

// Login function
const login = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    User.findUserByEmail(email, async (err, user) => {
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password.');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
};

module.exports = { signup, login };

