var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var OrderItem = require('../models/orderItem.js');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    orderNumber: { type: Number },
    whoReceives: { type: String, required: [true, 'Who receives is required'] },
    date: { type: Date, required: [true, 'The date is required'] },
    telephone: { type: Number, required: [true, 'The telephone is required'] },
    address: { type: String, required: [true, 'The address is required'] },
    _userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'The order has to have an user asociated'] },
    items: [OrderItem.schema],
    comments: { type: String },
    shippingCost: { type: Number, required: [true, 'The order has to have a shiping cost'] },
    total: { type: Number, required: [true, 'The order has to have a total'] }
}, { collection: 'orders' });

orderSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

orderSchema.plugin(autoIncrement, { inc_field: 'orderNumber' });

module.exports = mongoose.model('Order', orderSchema);