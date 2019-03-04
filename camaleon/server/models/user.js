var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

var userSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    lastName: { type: String, required: [true, 'El apellido es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El correo es obligatorio'] },
    password: { type: String, required: [true, 'El password es obligatorio'] },
    image: { type: String },
    role: { type: String, required: [true, 'El rol es obligatorio'], default: 'USER_ROLE', enum: rolesValidos },
}, { collection: 'users' });

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('User', userSchema);