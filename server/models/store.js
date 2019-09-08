var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var uniqueValidator = require('mongoose-unique-validator');
var StoreCategory = require('../models/storeCategory.js');

var Schema = mongoose.Schema;

var Status = Object.freeze({
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
});

// var storeSchema = new Schema({
//     name: { type: String, unique: true, required: [true, 'Name is required'] },
//     codeName: { type: String, unique: true, required: [true, 'Code Name is required'] },
//     description: { type: String, required: [true, 'Description is required'] },
//     imageLogo: { type: String, required: [true, 'Image is required'] },
//     imageBanner: { type: String },
//     numberOfItems: { type: Number, default: 0, required: [true, 'Image is required'] },
//     status: { type: String, enum: Object.values(Status), default: Status.ACTIVE, required: [true, 'Status is required'] },
//     emails: { type: [String], required: [true, 'Image is required'] },
//     _categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Must have a category associated'] },
//     _userIds: { type: [Schema.Types.ObjectId], ref: 'User', required: [true, 'At least one user should be associated'] },
// }, { collection: 'stores' });

var storeSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    codeName: { type: String, required: [true, 'Code Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    imageLogo: { type: String, required: [true, 'Image is required'] },
    imageBanner: { type: String },
    numberOfItems: { type: Number, default: 0, required: [true, 'Image is required'] },
    status: { type: String, enum: Object.values(Status), default: Status.ACTIVE, required: [true, 'Status is required'] },
    emails: { type: [String], required: [true, 'Image is required'] },
    _categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Must have a category associated'] },
    _userIds: { type: [Schema.Types.ObjectId], ref: 'User', required: [true, 'At least one user should be associated'] },
}, { collection: 'stores' });

storeSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
storeSchema.plugin(random);

Object.assign(storeSchema.statics, {
    Status,
});

module.exports = mongoose.model('Store', storeSchema);