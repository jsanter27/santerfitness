const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    times: [{
        instructor: String,
        day: {
            type: String,
            enum: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        },
        startTime: String,
        endTime: String
    }],
    lastModifiedBy: String
});

module.exports = mongoose.model('Event', EventSchema);