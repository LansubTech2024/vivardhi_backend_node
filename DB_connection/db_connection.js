
const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('node', 'root', 'sys@0805', {


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