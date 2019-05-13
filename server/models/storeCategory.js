var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeCategorySchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String },
    number: { type: Number }
}, { _id: false });

module.exports = mongoose.model('StoreCategory', storeCategorySchema);