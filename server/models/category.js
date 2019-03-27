var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    description: { type: String, unique: true, required: [true, 'El correo es obligatorio'] },
    images: { type: [String] }
}, { collection: 'categories' });

categorySchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Category', categorySchema);