var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactMessageSchema = new Schema({
    name: { type: String, required: [true, 'name is mandatory'] },
    lastName: { type: String, required: [true, 'lastName is mandatory'] },
    email: { type: String, required: [true, 'email is mandatory'] },
    phone: { type: String },
    message: { type: String, required: [true, 'message is mandatory'] }
}, { collection: 'contactMessages' });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);