const UserModel = require('./user.model');
const passwordHash = require('password-hash');
const userQuery = require('./user.query');
const jsonwebtoken = require("jsonwebtoken");


const Generatetoken = (userId)=>{
   return jsonwebtoken.sign({id:userId},process.env.SECRETKEY,{expiresIn:"10d"})
}

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

const login = (req,res,next)=>{
    UserModel.findOne({
        $or:[ // or is for either one of the option like gmail or username 
            {username: req.body.username},
            {email: req.body.username}
        ]
    },(err,user)=>{
       if(err){
           return next({
               msg: err,
               status: 401
           })
       }
       if(!user){
           return next({
               msg: "User is not found",
               status: 401
           })
       }
       
       let passwordCheck = passwordHash.verify(req.body.password,user.password)
       if(!passwordCheck){
            return next({
                msg: "Username or password is invalid"
            })
       }
       let token  = Generatetoken(user._id)
       res.json({
           user: user,
           token
       })
    })
}

module.exports ={
    register,
    login
}