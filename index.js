const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const  sequelize  = require('./DB_connection/db_connection');
const PORT = process.env.PORT || 5000
const Approuter = require('./routers/router')

//Initialize the app
const app = express()
app.use(cors());
app.use(bodyparser.json());


app.get('/' , (req,res)=>{
    res.send("Welcome to Lansub Server!")
})

app.use(Approuter);

async function startServer() {
    try {
      // Attempt to sync the database
      await sequelize.sync({ force: false });
      console.log('Database & tables created!');
  
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Unable to start server:', error);
    }
  }
  
  // Call the async function to start the server
  startServer();