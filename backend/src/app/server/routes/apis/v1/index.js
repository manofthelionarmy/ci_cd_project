const express = require('express');
const hobbiesRoutes = require('./hobbies');
const router = express.Router();

router.use('/hobbies', hobbiesRoutes);

module.exports = router; 