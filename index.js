// const express = require('express')
// const cors = require('cors')
// require('dotenv').config();
// const bodyparser = require('body-parser')
// // const  connectToDatabase  = require('./DB_connection/db_connection');
// const  sequelize  = require('./DB_connection/db_connection');
// const PORT = process.env.PORT || 5000
// const Approuter = require('./routers/router')

// //Initialize the app
// const app = express()
// app.use(cors());
// app.use(bodyparser.json());


// app.get('/' , (req,res)=>{
//     res.send("Welcome to Lansub Server!")
// })

// app.use(Approuter);

// async function startServer() {
//     try {
//       // Connect to MongoDB
//       // await connectToDatabase();
//       await sequelize.sync({force: false});
//       console.log("Database & tables created!")
  
//       app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//       });
//     } catch (error) {
//       console.error('Unable to start server:', error);
//     }
//   }
  
//   // Call the async function to start the server
//   startServer();

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const Approuter = require('./routers/router');

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyparser.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

app.get('/', (req, res) => {
    res.send("Welcome to Lansub Server!");
});

app.use(Approuter);

async function startServer() {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log("Database connection established successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
    }
}

// Call the async function to start the server
startServer();