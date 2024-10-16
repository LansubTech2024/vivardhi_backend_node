
const bcrypt = require('bcryptjs');

// Create a new user
const createUser = async (name, email, password, callback) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    
    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Find a user by email
const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    
    db.query(sql, [email], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

module.exports = { createUser, findUserByEmail };
