const express = require("express"); // importing express
const cors = require('cors')
const app = express(); //creating app 
require('./database'); //importing the database 
app.use(cors());
app.use(express.json()); // json object, x-form-urlencoded 
app.use(express.urlencoded({extended:true})) // form data recieve , array of string
const approuter = require('./app-routing')


app.use('/v1',approuter);
app.use((req,res,next)=>{
    res.send({
        msg: "Error occured",
        status: 400
    })
})

app.use((error,req,res,next)=>{ // error recieves error message from next 
    res.status(error.status || 400); // error handler
    res.send({
        msg: error.msg,
        status: error.status
    })
})

// app.get('/hi',(req,res,next)=>{
//     console.log(req.query); //site ma /hi?name=Bibek use garey yeta req.query garda {name : "Bibek" } aaucha 
//     res.send("HI");
// })

app.listen(process.env.PORT,(err,done)=>{
    if(err){
        console.log("Server was interupted")
    }
    else{
        console.log("Server started at port",process.env.PORT)
    }
})