const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
    id: String,
    key: String,
    url: String,
    isSchedule: Boolean,
    lastModifiedBy: String
});

module.exports = mongoose.model('Picture', PictureSchema);