
// const { Sequelize } = require('sequelize');
// const fs = require('fs');

// // const sequelize = new Sequelize('opfact', 'myadminuser', 'Keerthi@05', {
// //     host: 'backendserver.mysql.database.azure.com',
// //     dialect: 'mysql',
// //     port: 3306,                                         
// //     dialectOptions: {
// //       ssl: {
// //         rejectUnauthorized: false
// //       }
// //    },
// //     logging: false,

// //  });



// const sequelize = new Sequelize('opfact', 'root', 'sys@0805', {
//  host: 'localhost',
//  dialect: 'mysql',
// });

// async function testConnection() {
//    try {
//      await sequelize.authenticate();
//      console.log('Database connection has been established successfully.');
//    } catch (error) {
//        console.error('Unable to connect to the database:', error);
//    }
//  }
  
//  testConnection();



// module.exports = sequelize;


const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;


// Connection function
async function connectDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


// Export mongoose instance
module.exports = connectDatabase;