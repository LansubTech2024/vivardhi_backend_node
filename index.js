const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 5000

//Initialize the app
const app = express()
app.use(cors());
app.use(bodyparser.json());



app.get('/' , (req,res)=>{
    res.send("Welcome to Lansub Server!")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));