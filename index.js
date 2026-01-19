const express = require('express');
const app = express();

const Port = 8081;

app.use(express.json());

app.get('/' , (req , res) =>{
    res.status(200).json({
        message : "home page"
    })
})

app.listen(Port , ()=>{
    console.log(`server runs on http://localhost:${Port}`);
    
})