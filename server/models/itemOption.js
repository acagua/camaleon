var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemOptionSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    values: { type: [String] }
}, { _id: false });

module.exports = mongoose.model('ItemOption', itemOptionSchema);