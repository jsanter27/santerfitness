const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    id: String,
    number: String
});

module.exports = mongoose.model('Notification', NotificationSchema);