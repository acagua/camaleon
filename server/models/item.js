var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    images: { type: [String] },
    _storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: [true, 'Must have a store associated'] },
    _storeCodeName: { type: String, required: [true, 'Must have a store code name associated'] },
    _categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Must have a category associated'] }
}, { collection: 'items' });

itemSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('Item', itemSchema);