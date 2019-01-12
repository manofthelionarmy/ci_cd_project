const mongoose = require('mongoose');
const HobbySchema = new mongoose.Schema({
    name: String, 
    hobby: String
}); 

module.exports = mongoose.model('Hobby', HobbySchema);