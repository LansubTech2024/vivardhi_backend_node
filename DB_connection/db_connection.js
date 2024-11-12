
const { Sequelize } = require('sequelize');
const fs=require('fs');


const sequelize = new Sequelize('opfact', 'myadminuser', 'Keerthi@05', {
    host: 'backendserver.mysql.database.azure.com',
    dialect: 'mysql',
    port: 3306,                                         // Default MySQL port
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // Path to SSL certificate
      }
    },
    logging: false,
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