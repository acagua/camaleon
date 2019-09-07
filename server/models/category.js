var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var random = require('mongoose-simple-random');

var Schema = mongoose.Schema;

var Status = Object.freeze({
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
});

var categorySchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    description: { type: String, unique: true, required: [true, 'El correo es obligatorio'] },
    images: { type: [String] },
    status: { type: String, enum: Object.values(Status), default: Status.ACTIVE, required: [true, 'Status is required'] }
}, { collection: 'categories' });

categorySchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
categorySchema.plugin(random);

Object.assign(categorySchema.statics, {
    Status,
});

module.exports = mongoose.model('Category', categorySchema);