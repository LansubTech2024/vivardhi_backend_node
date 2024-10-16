const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 5000
const Approuter=require('./routers/router')
//Initialize the app
const app = express()
app.use(cors());
app.use(bodyparser.json());



app.use(Approuter);

app.get('/' , (req,res)=>{
    res.send("Welcome to Lansub Server!")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));