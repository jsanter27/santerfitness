const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

require('dotenv').config();

router.post('/trial', (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    
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