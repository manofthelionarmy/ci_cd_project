const Hobby = require('.././../models/hobbies.model');

const getAllHobbies = () => {
    return new Promise((resolve, reject) => {
        const query = Hobby.find();

        query.then((hobbies) => {
            resolve(hobbies);
        }).catch((err) => {
            reject(new Error('Cannot get all hobbies'));
        });
    });
}

const addHobby = (hobby) => {
    return new Promise((resolve, reject) => {
        const hobby = new Hobby({
            name: hobby.name,
            hobby: hobby.hobby
        });

        hobby.save().then((h) => {
            resolve({hobbyId: h._id, message: 'Succesfully saved a hobby.'});
        }).catch((err) => {
            // Reject when an error occurs during the save
            reject(err); 
        });
    });
}

module.exports = {
    getAllHobbies: getAllHobbies,
    addHobby: addHobby
}