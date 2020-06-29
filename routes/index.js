const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { environment: process.env.NODE_ENV });
});

module.exports = router;