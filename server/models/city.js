var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var citySchema = new Schema({
    code: { type: String, required: [true, 'Code is mandatory'] },
    name: { type: String, unique: true, required: [true, 'Name is mandatory'] },
    _departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: [true, 'Must have a department associated'] },
}, { collection: 'cities' });

citySchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('City', citySchema);