const express = require('express');
const router = express.Router();

if (process.env.NODE_ENV !== 'production') {
    router.get('/', (req, res) => {
        res.render('index', { environment: process.env.NODE_ENV });
    });
}
else {
    router.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '.', 'client', 'build', 'index.html'));
    });
}

module.exports = router;