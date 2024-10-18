const User = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateToken = (user) => {
    console.log('Generating token for user:', user.id);
    
    const payload = {
        userId: user.id,
        email: user.email
    };
    
    console.log('Token payload:', payload);
    
    const options = { expiresIn: '1h' };
    
    try {
        const token = jwt.sign(payload, JWT_SECRET, options);
        console.log('Token generated successfully');
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

// Signup function
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Generated Token:', token);

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Profile function
exports.updateProfile = async (req, res) => {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Check if req.user.userId exists
        if (!req.user.userId) {
            return res.status(401).json({ error: 'User ID not found in token' });
        }

        const user = await User.findByPk(req.user.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { name, email } = req.body;

        // Check if any changes were made
        const changes = {};
        if (name && name !== user.name) changes.name = name;
        if (email && email !== user.email) changes.email = email;

        // Update user data only if changes were made
        if (Object.keys(changes).length > 0) {
            await user.update(changes);
            res.json({ message: 'Profile updated successfully', user: user.toJSON() });
        } else {
            res.json({ message: 'No changes were made', user: user.toJSON() });
        }
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({ error: error.message });
    }
};