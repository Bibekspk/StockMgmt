const express = require("express"); // importing express
const app = express(); //creating app 
require('./database'); //importing the database 

// app.get('/',(req,res,next)=>{
//     res.send("Hello");
// })

app.get('/hi',(req,res,next)=>{
    console.log(req.query); //site ma /hi?name=Bibek use garey yeta req.query garda {name : "Bibek" } aaucha 
    res.send("HI");
})

app.listen(process.env.PORT,(err,done)=>{
    if(err){
        console.log("Server was interupted")
    }
    else{
        console.log("Server started at port",process.env.PORT)
    }
})