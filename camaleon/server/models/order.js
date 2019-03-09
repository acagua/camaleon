var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var orderItemSchema = new Schema({
    _itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number }
});

var orderSchema = new Schema({
    whoReceives: { type: String, required: [true, 'Who receives is required'] },
    date: { type: Date, required: [true, 'The date is required'] },
    telephone: { type: Number, required: [true, 'The telephone is required'] },
    address: { type: String, required: [true, 'The address is required'] },
    _userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'The order has to have an user asociated'] },
    //_userId: { type: String, required: [true, 'The monda is required'] },
    items: [orderItemSchema],
    shippingCost: { type: Schema.Types.Decimal128, required: [true, 'The order has to have a shiping cost'] },
    total: { type: Schema.Types.Decimal128, required: [true, 'The order has to have a total'] }
}, { collection: 'orders' });

orderSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('Order', orderSchema);