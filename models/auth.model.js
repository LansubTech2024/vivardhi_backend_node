const db = require('../DB_connection/db_connection');
const bcrypt = require('bcryptjs');
// Create a new user
const createUser = async (name, email, password, callback) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        
        // Check if callback is a function
        if (typeof callback !== 'function') {
            throw new Error('Callback is not a function');
        }

        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                return callback(err); // Pass error to callback
            }
            callback(null, result); // Pass result to callback
        });
    } catch (error) {
        // Handle any synchronous errors
        if (typeof callback === 'function') {
            return callback(error);
        } else {
            console.error('Error in createUser:', error);
        }
    }
};

// Find a user by email
const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';

    // Check if callback is a function
    if (typeof callback !== 'function') {
        return console.error('Callback is not a function');
    }
    
    db.query(sql, [email], (err, result) => {
        if (err) {
            return callback(err); // Pass error to callback
        }
        callback(null, result[0]); // Pass the found user to callback
    });
};

module.exports = { createUser, findUserByEmail };
