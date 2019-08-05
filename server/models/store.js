var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var uniqueValidator = require('mongoose-unique-validator');
var StoreCategory = require('../models/storeCategory.js');

var Schema = mongoose.Schema;

var Status = Object.freeze({
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo'
});

var storeSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    description: { type: String, unique: true, required: [true, 'El correo es obligatorio'] },
    image: { type: String, required: [true, 'La imagen debe es obligatoria'] },
    imageBanner: { type: String },
    numberOfItems: { type: Number },
    status: { type: String, enum: Object.values(Status), default: Status.ACTIVE, required: [true, 'Status is required'] },
    emails: { type: [String] },
    categories: { type: [StoreCategory.schema] },
    _categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Must have a category associated'] },
}, { collection: 'stores' });

storeSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
storeSchema.plugin(random);

Object.assign(storeSchema.statics, {
    Status,
});

module.exports = mongoose.model('Store', storeSchema);