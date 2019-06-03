var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    code: { type: String, required: [true, 'Code is mandatory'] },
    name: { type: String, unique: true, required: [true, 'Name is mandatory'] },
}, { collection: 'departments' });

departmentSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Department', departmentSchema);