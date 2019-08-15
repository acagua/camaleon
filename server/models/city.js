var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var citySchema = new Schema({
    cityCode: { type: String },
    name: { type: String },
    cityDepartmentCode: { type: String },
    _departmentCode: { type: String },
    _department: { type: String }
}, { collection: 'cities' });

module.exports = mongoose.model('City', citySchema);