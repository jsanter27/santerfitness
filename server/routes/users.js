var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportConfig = require('../config/passport');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

require('dotenv').config();

const site_url = (process.env.URL || "http://localhost:" + (process.env.CLIENT_PORT || '3000'));

const signToken = id => {
  return jwt.sign({
    iss : process.env.JWT_ISS,
    sub : id
  }, process.env.PASSPORT_SECRET, {expiresIn: "3h"});
}

// REGISTER ROUTE
router.post('/register', passport.authenticate('jwt', {session : false}), (req, res) => {
  const { username, password } = req.body;
  User.findOne({username}, (err, user) => {
    if (err)
      res.status(500).json({message : {msgBody : "Database Error", msgError: true}});
    else if (user)
      res.status(400).json({message : {msgBody : "Account already exists with that email", msgError: true}});
    else {
      const newUser = new User({username, password, resetPasswordToken:null, resetPasswordExpires:null});
      newUser.save(err => {
        if (err)
          res.status(500).json({message : {msgBody : "Database Error", msgError: true}});
        else 
          res.status(201).json({message : {msgBody : "Account succesfully created", msgError : false}});
      });
    }
  });
});

// LOGIN ROUTE
router.post('/login', passport.authenticate('local', {session : false}) , (req, res) => {
  if (req.isAuthenticated()){
    const {_id, username} = req.user;
    const token = signToken(_id);
    res.cookie('accessToken', token, {httpOnly : true, sameSite : true});
    res.status(200).json({isAuthenticated : true, user : {username}});
  }
});

// FORGOT PASSWORD ROUTE
router.post('/forgot', (req, res) => {
  const { username } = req.body;
  User.findOne({username}, (err, user) => {
    if (err)
      res.status(500).json({message : {msgBody : "Database Error", msgError: true}});
    else if (!user)
      res.status(400).json({message : {msgBody : "No account with that email", msgError: true}});
    else {
      const token = crypto.randomBytes(20).toString('hex');
      user.updateOne({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now()+3600000
      }, (err, raw) => {
        if (err)
          res.status(500).json({message : {msgBody : "Database Error", msgError: true}});
      });
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SF_EMAIL,
          pass: process.env.SF_EMAIL_PASSWORD
        }
      });
      const mailOptions = {
        from: process.env.SF_EMAIL,
        to: `${user.username}`,
        subject: 'Reset Password Request',
        text: `To reset your password, please click the link within one hour of receiving this email:\n\n` +
              `${site_url}/admin/reset/${token}\n\n` +
              `If you didn't request this, delete this message.\n`
      };
      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          res.status(500).json({message : {msgBody : "Mailing Error", msgError: true}});
        }
        else {
          res.status(200).json({message : {msgBody : "Recovery Email Sent", msgError : false}});
        }
      });
    }
  });
});

// LOGOUT ROUTE
router.get('/logout', passport.authenticate('jwt', {session : false}), (req, res) => {
  res.clearCookie('accessToken');
  res.json({user : {username : ""}, success : true});
});

// PERSISTENCE
router.get('/authenticated', passport.authenticate('jwt', {session : false}), (req, res) => {
  const {username} = req.user;
  res.status(200).json({isAuthenticated : true, user: {username}});
});

router.post('/changepassword', (req, res) => {
  const { resetPasswordToken, password } = req.body;
  User.findOne({ resetPasswordToken }, (err, user) => {
    if (!user){
      res.status(400).json({message : {msgBody : "Cannot change user's password at this time", msgError: true}});
    }
    else if (user.resetPasswordExpires < Date.now()) {
      res.status(400).json({message : {msgBody : "The period to change this user's password has expired", msgError: true}});
    }
    else {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err){
          res.status(500).json({message : {msgBody : "Could not hash new password", msgError: true}});
        }
        else{
          user.updateOne({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null }, (err) => {
            if (err) {
              res.status(500).json({message : {msgBody : "Database error", msgError: true}});              
            }
            else {
              res.status(200).json({message : {msgBody : "Successfully changed password", msgError: false}});
            }
          });
        }
      }); 
    }
  });
});

module.exports = router;