var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    code: { type: String, required: [true, 'Code is mandatory'] },
    name: { type: String, required: [true, 'Name is mandatory'] },
}, { collection: 'departments' });

module.exports = mongoose.model('Department', departmentSchema);