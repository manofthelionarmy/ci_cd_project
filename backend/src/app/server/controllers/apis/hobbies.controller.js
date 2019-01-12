const hobbiesService = require('../../services/hobbies.service');

const getAll = (req, res) => {
    hobbiesService.getAllHobbies().then((hobbies) => {
        res.status(200).json({
            hobbies: hobbies,
            message: 'Successfully retrieved hobbies'
        }); 
    }).catch((err) => {
        res.status(404).json({
            message: err.message
        }); 
    });
}

module.exports = {
    getAll: getAll
}