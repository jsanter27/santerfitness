const express = require('express');
const router = express.Router();
const upload = require('../services/uploads').upload;
const s3 = require('../services/uploads').s3;
const Picture = require('../models/Picture');
const passport = require('passport');
require('../config/passport');
require('dotenv').config();

const singleUpload = upload.single('image');
const authentication = passport.authenticate('jwt', {session : false});

router.post('/slide', [authentication, singleUpload], (req, res) => {
    const { username } = req.user;
    const { location, key } = req.file;
    let newPicture = new Picture({key, url: location, isSchedule: false, lastModifiedBy: username});
    newPicture.save((err) => {
        if (err){
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        res.status(201).json({message : {msgBody : "Slide added to database", msgError: false}});
    });
});

router.post('/schedule', [authentication, singleUpload], (req, res) => {
    const { username } = req.user;
    const { location, key } = req.file;
    Picture.findOneAndDelete({ isSchedule: true }, (err, oldSchedule) => {
        if (err){
            res.status(500).json({message : {msgBody : "Could not delete old image", msgError: true}});
        }
        if (oldSchedule){
            s3.deleteObject({Bucket: process.env.S3_BUCKET_NAME, Key: oldSchedule.key}, (err, data) => {
                let newSchedule = new Picture({key, url: location, isSchedule: true, lastModifiedBy: username});
                newSchedule.save((err) => {
                    if (err){
                        res.status(500).json({message : {msgBody : "Database error", msgError: true}});
                    }
                    res.status(201).json({message : {msgBody : "Schedule added to database", msgError: false}});
                });
            });
        }
        else {
            let newSchedule = new Picture({key, url: req.file.location, isSchedule: true, lastModifiedBy: username});
            newSchedule.save((err) => {
                if (err){
                    res.status(500).json({message : {msgBody : "Database error", msgError: true}});
                }
                res.status(201).json({message : {msgBody : "Schedule added to database", msgError: false}});
            });
        }
    });
});


module.exports = router;