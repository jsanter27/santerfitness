const express = require('express');
const router = express.Router();
const upload = require('../services/uploads').upload;
const s3 = require('../services/uploads').s3;
const Picture = require('../models/Picture');
const Alert = require('../models/Alert');
const Event = require('../models/Event');
const passport = require('passport');
const nodemailer = require('nodemailer');

require('../config/passport');
require('dotenv').config();

const singleUpload = upload.single('image');
const authentication = passport.authenticate('jwt', {session : false});

router.post('add/slide', [authentication, singleUpload], (req, res) => {
    const { username } = req.user;
    const { location, key } = req.file;
    let newPicture = new Picture({key, url: location, isSchedule: false, lastModifiedBy: username});
    newPicture.save((err, slide) => {
        if (err){
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        if (!slide){
            res.status(400).json({message : {msgBody : "Could not save slide to database", msgError: true}});            
        }
        res.status(201).json({message : {msgBody : "Slide successfully added", msgError: false}, data : slide});
    });
});

router.post('add/schedule', [authentication, singleUpload], (req, res) => {
    const { username } = req.user;
    const { location, key } = req.file;
    Picture.findOneAndDelete({ isSchedule: true }, (err, oldSchedule) => {
        if (err){
            res.status(500).json({message : {msgBody : "Could not delete old image", msgError: true}});
        }
        if (oldSchedule){
            s3.deleteObject({Bucket: process.env.S3_BUCKET_NAME, Key: oldSchedule.key}, (err, data) => {
                let newSchedule = new Picture({key, url: location, isSchedule: true, lastModifiedBy: username});
                newSchedule.save((err, sched) => {
                    if (err){
                        res.status(500).json({message : {msgBody : "Database error", msgError: true}});
                    }
                    if (!sched){
                        res.status(400).json({message : {msgBody : "Could not save schedule to database", msgError: true}});            
                    }
                    res.status(201).json({message : {msgBody : "Schedule successfully added", msgError: false}, data : sched});
                });
            });
        }
        else {
            let newSchedule = new Picture({key, url: req.file.location, isSchedule: true, lastModifiedBy: username});
            newSchedule.save((err, sched) => {
                if (err){
                    res.status(500).json({message : {msgBody : "Database error", msgError: true}});
                }
                if (!sched){
                    res.status(400).json({message : {msgBody : "Could not save schedule to database", msgError: true}});            
                }
                res.status(201).json({message : {msgBody : "Schedule successfully added", msgError: false}, data : sched});
            });
        }
    });
});

router.post('/add/alert', authentication, (req, res) => {
    const { message, isActive, isEmergency } = req.body;
    const lastModifiedBy = req.user.username;

    let newAlert = new Alert({message, isActive, isEmergency, lastModifiedBy});

    newAlert.save((err, alrt) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        else if (!alrt) {
            res.status(500).json({message : {msgBody : "Could not save alert to the database", msgError: true}});
        }
        else {
            res.status(201).json({message : {msgBody : "Alert successfully added", msgError: false}, data : alrt});
        }
    });
});

router.post('/add/event', authentication, (req, res) => {
    const { name, description, instructors } = req.body;
    const lastModifiedBy = req.user.username;

    let newEvent = new Event({name, description, instructors, lastModifiedBy});

    newEvent.save((err, evnt) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        else if (!evnt) {
            res.status(500).json({message : {msgBody : "Could not save event to the database", msgError: true}});
        }
        else {
            res.status(201).json({message : {msgBody : "Event successfully added", msgError: false}, data : evnt});
        }
    });
});

router.get('/remove/slide/:key', authentication, (req, res) => {
    const { key } = req.params;
    
    Picture.findOneAndRemove({ key }, (err, removedSlide) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        else if (!removedSlide) {
            res.status(400).json({message : {msgBody : "Slide not found in database", msgError: true}});
        }
        else {
            s3.deleteObject({Bucket: process.env.S3_BUCKET_NAME, Key: removedSlide.key}, (err, data) => {
                if (err){
                    res.status(500).json({message : {msgBody : "Cloud error", msgError: true}});
                }
                else {
                    res.status(201).json({message : {msgBody : "Slide successfully deleted", msgError: false}, data : removedSlide});
                }
            });
        }
    });
});

router.get('/remove/schedule', authentication, (req, res) => {
    Picture.findOneAndRemove({ isSchedule: true }, (err, removedSchedule) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        else if (!removedSchedule) {
            res.status(400).json({message : {msgBody : "Schedule not found in database", msgError: true}});
        }
        else {
            s3.deleteObject({Bucket: process.env.S3_BUCKET_NAME, Key: removedSchedule.key}, (err, data) => {
                if (err){
                    res.status(500).json({message : {msgBody : "Cloud error", msgError: true}});
                }
                else {
                    res.status(201).json({message : {msgBody : "Schedule successfully deleted", msgError: false}, data : removedSchedule});
                }
            });
        }
    });
});

router.get('/remove/alert/:id', authentication, (req, res) => {
    const { id } = req.params;

    Alert.findByIdAndRemove(id, (err, removedAlert) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        else if (!removedAlert) {
            res.status(400).json({message : {msgBody : "Alert not found in database", msgError: true}});
        }
        else {
            res.status(201).json({message : {msgBody : "Alert successfully deleted", msgError: false}, data : removedAlert});
        }
    });
});

router.get('/remove/event/:id', authentication, (req, res) => {
    const { id } = req.params;

    Event.findByIdAndRemove(id, (err, removedEvent) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        else if (!removedEvent) {
            res.status(400).json({message : {msgBody : "Event not found in database", msgError: true}});
        }
        else {
            res.status(201).json({message : {msgBody : "Event successfully deleted", msgError: false}, data : removedEvent});
        }
    });
});

router.post('/update/alert/:id', authentication, (req, res) => {
    const { id } = req.params;
    const lastModifiedBy = req.user.username;
    const { message, isActive, isEmergency } = req.body;

    Alert.findByIdAndUpdate(id, {message, isActive, isEmergency, lastModifiedBy}, (err, updatedAlert) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        else if (!updatedAlert) {
            res.status(400).json({message : {msgBody : "Alert not found in database", msgError: true}});
        }
        else {
            res.status(201).json({message : {msgBody : "Alert successfully updated", msgError: false}, data : updatedAlert});
        }
    });
});

router.post('/update/event/:id', authentication, (req, res) => {
    const { id } = req.params;
    const lastModifiedBy = req.user.username;
    const { name, description, instructors } = req.body;

    Event.findByIdAndUpdate(id, {name, description, instructors, lastModifiedBy}, (err, updatedEvent) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        else if (!updatedEvent) {
            res.status(400).json({message : {msgBody : "Event not found in database", msgError: true}});
        }
        else {
            res.status(201).json({message : {msgBody : "Event successfully updated", msgError: false}, data : updatedEvent});
        }
    });
});

router.get('/slides', (req, res) => {
    Picture.find({ isSchedule: false }, (err, slides) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});            
        }
        else {
            res.status(201).json({message : {msgBody : "Successfully found slides", msgError: false}, data : slides});            
        }
    });
});

router.get('/slide/:key', (req, res) => {
    const { key } = req.params;
    Picture.findOne({ key }, (err, slide) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});            
        }
        else {
            res.status(201).json({message : {msgBody : "Successfully found slide", msgError: false}, data : slide});            
        }
    });
});

router.get('/schedules', (req, res) => {
    Picture.find({ isSchedule: true }, (err, schedule) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});            
        }
        else {
            res.status(201).json({message : {msgBody : "Successfully found schedule", msgError: false}, data : schedule});            
        }
    });
});

router.get('/alerts', (req, res) => {
    Alert.find((err, alrts) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});            
        }
        else {
            res.status(201).json({message : {msgBody : "Successfully found alerts", msgError: false}, data : alrts});            
        }
    });
});

router.get('/alert/:id', (req, res) => {
    const { id } = req.params;
    Alert.findOne({ id }, (err, alert) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});            
        }
        else {
            res.status(201).json({message : {msgBody : "Successfully found alert", msgError: false}, data : alert});            
        }
    });
});

router.get('/events', (req, res) => {
    Alert.find((err, evnts) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});            
        }
        else {
            res.status(201).json({message : {msgBody : "Successfully found events", msgError: false}, data : evnts});            
        }
    });
});

router.get('/event/:id', (req, res) => {
    const { id } = req.params;
    Event.findOne({ id }, (err, event) => {
        if (err) {
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});            
        }
        else {
            res.status(201).json({message : {msgBody : "Successfully found event", msgError: false}, data : event});            
        }
    });
});

router.post('/trial', (req, res) => {
    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || firstName.trim() === '' || !lastName || lastName.trim() === '' || !email || email.trim() === '' || !phone || phone.trim() === ''){
        res.status(400).json({message : {msgBody : "Invalid fields", msgError: true}});            
    }
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SF_EMAIL,
            pass: process.env.SF_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SF_EMAIL,
        to: process.env.SF_EMAIL,
        subject: `NEW 7 DAY PASS REQUEST: ${firstName} ${lastName}`,
        text: `\nReminder: Verify that the person is not already in the system...\n\n\n` +
              `First Name    : ${firstName}\n\n` +
              `Last Name     : ${lastName}\n\n` +
              `Email Address : ${email}\n\n` +
              `Phone Number  : ${phone}\n\n\n`
    }

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            res.status(500).json({message: {msgBody : "Request could not be sent", msgError: true}});
        }
        else {
            res.status(200).json({message: {msgBody : "Request for 7 day pass sent", msgError: false}});
        }
    })
});

module.exports = router;