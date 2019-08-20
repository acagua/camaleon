var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    lastName: { type: String, required: [true, 'El apellido es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El correo es obligatorio'] },
    password: { type: String, required: [true, 'El password es obligatorio'] },
    telephone: { type: String },
    address: { type: String },
    image: { type: String }
}, { collection: 'users' });

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('User', userSchema);