const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemTypeSchema=new Schema({
    itemType:String
})

module.exports= mongoose.model('ItemType',ItemTypeSchema);