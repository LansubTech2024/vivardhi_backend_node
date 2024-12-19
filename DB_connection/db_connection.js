
const { Sequelize } = require('sequelize');
const fs = require('fs');

// const sequelize = new Sequelize('opfact', 'myadminuser', 'Keerthi@05', {
//     host: 'backendserver.mysql.database.azure.com',
//     dialect: 'mysql',
//     port: 3306,                                         
//     dialectOptions: {
//       ssl: {
//         rejectUnauthorized: false
//       }
//    },
//     logging: false,

//  });

const sequelize = new Sequelize('opfact', 'root', 'Lansub@2024', {
  host: 'localhost',
  dialect: 'mysql',
});

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  testConnection();



module.exports = sequelize;


// const mongoose = require('mongoose');


// const uri = 'mongodb://localhost:27017/mes_db'; 


// async function connectToDatabase() {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Database connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// connectToDatabase();

// module.exports = mongoose;
