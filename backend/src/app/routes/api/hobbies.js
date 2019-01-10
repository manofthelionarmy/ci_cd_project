const express = require('express');
const router = express.Router();

const addRoutes = (app, hobbyController) => {

    router.get('/hobbies/getAll', (req, res, next) => {
        hobbyController.getAllHobbies().then((hobbies) => {
            res.status(200).json({
                hobbies: hobbies
            }); 
        }).catch((err) => {
            res.status(404).json({
                hobbies: [],
                message: err.message
            });
        });  
    }); 

    router.post('/hobbies/addHobby', (req, res, next) => {
        hobbyController.addHobby(req.body.name, req.body.hobby).then((response) => {
            res.status(201).json ({
                message: response.message
            }); 
        });
    }); 

    app.use('/api', router);
}; 

module.exports = {
    addRoutes: addRoutes
}