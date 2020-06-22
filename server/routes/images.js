const express = require('express');
const router = express.Router();

const upload = require('../services/upload');

const Picture = require('../models/Picture');

const passport = require('passport');
require('../config/passport');


const singleUpload = upload.single('image');
const authentication = passport.authenticate('jwt', {session : false});

router.post('/upload/slide', [authentication, singleUpload], (req, res) => {
    const { username } = req.user;
    console.log(req.file);
    if (err){
        res.status(500).json({message : {msgBody : "Could not upload slide", msgError: true}});
    }
    let newPicture = new Picture({url: req.file.location, isSchedule: false, lastModifiedBy: username});
    newPicture.save((err) => {
        if (err){
            res.status(500).json({message : {msgBody : "Database error", msgError: true}});
        }
        res.status(201).json({message : {msgBody : "Slide added to database", msgError: true}});
    });
});

router.post('/upload/schedule', [authentication, singleUpload], (req, res) => {
    const { username } = req.user;
    Picture.findOneAndDelete({ isSchedule: true }, (err) => {
        if (err){
            res.status(500).json({message : {msgBody : "Could not delete old image", msgError: true}});
        }
        singleUpload(req, res, (err) => {
            if (err) {
                res.status(500).json(res.status(500).json({message : {msgBody : "Could not upload image", msgError: true}}));
            }
            let newSchedule = new Picture({url: req.file.location, isSchedule: true, lastModifiedBy: username});
            newSchedule.save((err) => {
                if (err){
                    res.status(500).json({message : {msgBody : "Database error", msgError: true}});
                }
                res.status(201).json({message : {msgBody : "Schedule added to database", msgError: true}});
            });
        });
    });
});


module.exports = router;