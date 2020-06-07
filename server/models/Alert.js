const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    id: String,
    message: String,
    isActive: Boolean,
    lastModifiedBy: String
});

module.exports = mongoose.model('Alert', AlertSchema);