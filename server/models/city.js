var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var citySchema = new Schema({
    cityCode: { type: String },
    name: { type: String },
    cityDepartmentCode: { type: String },
    _departmentCode: { type: String },
    _department: { type: String }
}, { collection: 'cities' });

citySchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('City', citySchema);