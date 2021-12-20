const jwt = require('jsonwebtoken');
const UserModel = require('../user/user.model');

export const VerifyToken=(req,res,next)=>{
    let token;
    if(req.headers['authorization']){
        token = req.headers['authorization']
    }
    jwt.verify(token,process.env.SECRETKEY,(err,decoded)=>{
        if(err){
            return next({
                msg: "Token is invalid or expired",
                status: 400
            })
        }
        if(decoded){
            UserModel.findById(decoded.id,(err,user)=>{
                if(err){
                    return next({
                        msg: "User is not available",
                        status:400
                    })
                }
                if(user){
                    req.user = user;
                    next(); // passing next process from middleware
                }
            })
        }
    })
}