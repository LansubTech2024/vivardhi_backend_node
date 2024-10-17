const mysql = require('mysql2')

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sys@0805',
    database: 'Vivardhi',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;