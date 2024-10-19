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

exports.updateProfile = async (req, res) => {
  try {
      if (!req.user?.userId) {
          return res.status(401).json({ error: 'Authentication required' });
      }

      const user = await User.findByPk(req.user.userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const { name, email } = req.body;

      const changes = {};
      if (name && name !== user.name) changes.name = name;
      if (email && email !== user.email) {
          // Check if the new email is unique
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser && existingUser.id !== user.id) {
              return res.status(400).json({ error: 'Email already in use' });
          }
          changes.email = email;
      }

      if (Object.keys(changes).length > 0) {
          await user.update(changes);
          res.json({ message: 'Profile updated successfully', user: user.toJSON() });
      } else {
          res.json({ message: 'No changes were made', user: user.toJSON() });
      }
  } catch (error) {
      console.error('Error in updateProfile:', error);
      if (error.name === 'SequelizeValidationError') {
          return res.status(400).json({ error: 'Invalid input data', details: error.errors });
      }
      res.status(500).json({ error: 'An unexpected error occurred' });
  }
};