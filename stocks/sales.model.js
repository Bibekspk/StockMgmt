const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
    billno: String,
    items: [Object],
    totalAmount: String,
    salesDate: Date
})

module.exports = mongoose.model('Sales',SalesSchema);