var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var storeSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    description: { type: String, unique: true, required: [true, 'El correo es obligatorio'] },
    image: { type: String, required: [true, 'La imagen debe es obligatoria'] },
    imageBanner: { type: String },
    numberOfItems: { type: Number }
}, { collection: 'stores' });

storeSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
storeSchema.plugin(random);

module.exports = mongoose.model('Store', storeSchema);