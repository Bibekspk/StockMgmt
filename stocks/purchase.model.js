const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const purchaseSchema = new Schema({
    billno: String,
    items:[Object],
    totalAmount : String,
    purchaseDate: Date
})

module.exports = mongoose.model('Purchase',purchaseSchema);