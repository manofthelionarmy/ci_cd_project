const hobbiesService = require('../../services/hobbies.service');

const getAll = (req, res, next) => {
    hobbiesService.getAllHobbies().then((hobbies) => {
        res.status(200).json({
            hobbies: hobbies,
            message: 'Successfully retrieved hobbies'
        }); 
    }).catch((err) => {
        res.status(404).json({
            hobbies: null, 
            message: err.message
        }); 
    });
}

const addHobby = (req, res, next) => {
    const hobby = {
        name: req.body.name,
        hobby: req.body.hobby
    };

    hobbiesService.addHobby(hobby).then((result) => {
        res.status(201).json({
            hobbyId: result.hobbyId,
            message: result.message
        });
    }).catch((err) => {
        res.status(500).json({
            hobbyId: null, 
            message: err.message
        });
    });
}

module.exports = {
    getAll: getAll,
    addHobby: addHobby
}