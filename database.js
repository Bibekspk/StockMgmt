let db = require("mongoose");
require("dotenv").config();
let DB_URL = `mongodb://127.0.0.1:27017/${process.env.DBNAME}`;

db.connect(DB_URL,(err,done)=>{
    if(err){
        console.log("DB connection failed")
    }
    else{
        console.log("DB connection succeded");
        // console.log(DB_URL);
    }

})