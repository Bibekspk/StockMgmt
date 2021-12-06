let db = require("mongoose");
let DB_URL = 'mongodb://127.0.0.1:27017/stock';

db.connect(DB_URL,(err,done)=>{
    if(err){
        console.log("DB connection failed")
    }
    else{
        console.log("DB connection succeded");
    }

})