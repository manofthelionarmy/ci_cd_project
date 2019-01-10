const mongoose = require('mongoose');

const hobbySchema = mongoose.Schema({
    name: { type: String },
    hobby: { type: String }
});

module.exports = mongoose.model('Hobby', hobbySchema);