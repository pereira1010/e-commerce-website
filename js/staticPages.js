const express = require('express');
const path = require('path');
const router = express.Router();


// Serve static files from views
router.use('/', express.static(path.join(__dirname, '../views')));

module.exports = router; 