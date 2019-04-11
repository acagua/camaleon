var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSpecificationSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    value: { type: String, required: [true, 'Value is required'] }
}, { _id: false });

module.exports = mongoose.model('ItemSpecification', itemSpecificationSchema);