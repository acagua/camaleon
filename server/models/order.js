var mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var OrderItem = require('../models/orderItem.js');
var Schema = mongoose.Schema;

var Status = Object.freeze({
    PAYMENT_PENDING: 'Pago Pendiente',
    PAID: 'Pagada',
    DELIVERED: 'Entregada',
    CANCELED: 'Cancelada'
});

var orderSchema = new Schema({
    number: { type: Number },
    status: { type: String, enum: Object.values(Status), default: Status.PAYMENT_PENDING, required: [true, 'Status is required'] },
    whoReceives: { type: String, required: [true, 'Who receives is required'] },
    date: { type: Date, required: [true, 'The date is required'] },
    telephone: { type: Number, required: [true, 'The telephone is required'] },
    address: { type: String, required: [true, 'The address is required'] },
    items: { type: [OrderItem.schema] },
    comments: { type: String },
    shippingCost: { type: Number, required: [true, 'The order has to have a shiping cost'] },
    total: { type: Number, required: [true, 'The order has to have a total'] },
    _userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'The order has to have an user asociated'] }
}, { collection: 'orders' });

orderSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
orderSchema.plugin(autoIncrement, { inc_field: 'number' });

Object.assign(orderSchema.statics, {
    Status,
});

module.exports = mongoose.model('Order', orderSchema);