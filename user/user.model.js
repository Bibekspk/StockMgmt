const mongoose = require('mongoose');

const schema = mongoose.Schema; // class ho tei vayera () use vayena 

const UserSchema = new schema({
    fullname: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin','normal'],
        default: "normal"
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true
    },
    branch:{
        type:String,
        required:true
    }
})

const UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;