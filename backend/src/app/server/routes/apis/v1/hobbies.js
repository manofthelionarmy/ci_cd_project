const express = require('express');
const router = express.Router();
const hobbiesController = require('../../../controllers/apis/hobbies.controller');

router.get('/getAll', hobbiesController.getAll);


module.exports = router; 