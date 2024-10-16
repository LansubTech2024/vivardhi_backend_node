const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyparser = require('body-parser')
const mysql = require('mysql2');
const PORT = process.env.PORT || 5000

//Initialize the app
const app = express()
app.use(cors());
app.use(bodyparser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lansub@2024',
    database: 'mes_database',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});


app.get('/' , (req,res)=>{
    res.send("Welcome to Lansub Server!")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));