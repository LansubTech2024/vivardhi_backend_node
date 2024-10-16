const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000


app.get('/' , (req,res)=>{
    res.send("Welcome to Lansub Server!")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));