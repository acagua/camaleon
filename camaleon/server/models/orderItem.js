var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderItemSchema = new Schema({
    _itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number }
}, { _id: false });

module.exports = mongoose.model('OrderItem', orderItemSchema);