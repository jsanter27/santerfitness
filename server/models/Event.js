const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    times: [{
        instructor: String,
        day: {
            type: String,
            enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        startTime: String,
        endTime: String
    }],
    lastModifiedBy: String
});

module.exports = mongoose.model('Event', EventSchema);