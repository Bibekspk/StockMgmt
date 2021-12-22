const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    itemName:{
        type:String,
        required:true
    },
    itemType:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    rate:{
        type: String,
        required:true
    },
    purchasedDate:{
        type:Date,
        required: true
    },
    branch:String,

})



module.exports = mongoose.model('Stocks',StockSchema);