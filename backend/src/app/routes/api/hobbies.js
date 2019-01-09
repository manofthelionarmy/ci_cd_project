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

    app.use('/api', router);
}; 

module.exports = {
    addRoutes: addRoutes
}