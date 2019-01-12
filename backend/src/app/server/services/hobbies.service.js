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

module.exports = {
    getAllHobbies: getAllHobbies
}