const UserModel = require('./user.model');
const passwordHash = require('password-hash');
const userQuery = require('./user.query');

const register=(req,res,next)=>{
    let data = req.body;
    let user = new UserModel({});
    userQuery.mapUser(data,user)
    user.password = passwordHash.generate(data.password)
    user.save((err,user)=>{
        if(err){
            next({
                msg: err,
                status: 400
            })
        }
        else{
            console.log("Registered successfully");
            res.send({
                msg: "Registered successfully",
                status : 200,
                data : user
            })
        }
        
    })

}

module.exports ={
    register
}