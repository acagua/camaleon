var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = require('../models/item.js');

var orderItemSchema = new Schema({
    item: { type: Item.schema },
    quantity: { type: Number },
    total: { type: Number }
}, { _id: false });

module.exports = mongoose.model('OrderItem', orderItemSchema);