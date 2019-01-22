const express = require('express');
const router = express.Router();
const hobbiesController = require('../../../controllers/apis/hobbies.controller');

router.get('/getAll', hobbiesController.getAll);

router.post('/addHobby', hobbiesController.addHobby);

module.exports = router; 