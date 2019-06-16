var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var payuSchema = new Schema({
    name: { type: String, required: [true, 'name is mandatory'] }
}, { collection: 'payus' });

module.exports = mongoose.model('PayU', payuSchema);