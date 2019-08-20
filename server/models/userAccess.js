var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = require('../models/item.js');

var Roles = Object.freeze({
    SUPERADMIN: 'Super Administrador',
    ADMIN: 'Administrador',
    USER: 'Usuario'
});

var userAccessSchema = new Schema({
    _storeId: { type: Schema.Types.ObjectId, ref: 'Store' },
    roles: { type: [String], enum: Object.values(Roles), default: Roles.USER, required: [true, 'Status is required'] },
}, { _id: false });

module.exports = mongoose.model('UserAccess', userAccessSchema);