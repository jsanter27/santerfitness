const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    instructors: [String],
    lastModifiedBy: String
});

module.exports = mongoose.model('Event', EventSchema);