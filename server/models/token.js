var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    token: { type: String, required: [true, 'El token es obligatorio'] },
    date: { type: Date, default: Date.now, required: [true, 'La fecha es obligatoria'] },
    email: { type: String, required: [true, 'El email es obligatorio'] }
}, { collection: 'tokens' });

module.exports = mongoose.model('Token', categorySchema);