var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var random = require('mongoose-simple-random');
var ItemOption = require('../models/itemOption.js');
var ItemSpecification = require('../models/itemSpecification.js');
var City = require('../models/city');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    images: { type: [String] },
    options: { type: [ItemOption.schema] },
    specifications: { type: [ItemSpecification.schema] },
    status: { type: String },
    shippingCities: { type: [City.schema] },
    shippingAllColombia: { type: Boolean },
    _storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: [true, 'Must have a store associated'] },
    _storeCodeName: { type: String, required: [true, 'Must have a store code name associated'] },
    _categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Must have a category associated'] },
    _storeCategoryId: { type: Schema.Types.ObjectId, ref: 'StoreCategory' }
}, { collection: 'items' });

itemSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
itemSchema.plugin(random);

module.exports = mongoose.model('Item', itemSchema);