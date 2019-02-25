var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    description: { type: String, required: [true, 'La descripción es obligatoria'] },
    price: { type: Number, required: [true, 'El precio es obligatorio'] },
    images: { type: [String] },
    _storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: [true, 'Debe tener una tienda asociada'] }
}, { collection: 'items' });

itemSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Item', itemSchema);