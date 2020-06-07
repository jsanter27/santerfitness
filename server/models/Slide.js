const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
    id: String,
    header: String,
    body: String,
    backgroundColor: String,
    lastModifiedBy: String
});

module.exports = mongoose.model('Slide', SlideSchema);