const mongoose = require('mongoose');
const autoIncrement = require('simple-mongoose-autoincrement');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    itemName: String,
    totalStock: Number,
    price: [String],
    quantity: [String],
})

ItemSchema.plugin(autoIncrement, { field: 'ItemRef' })

module.exports = mongoose.model('Items', ItemSchema);