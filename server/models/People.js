const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    name: {
        type: String
    },
    DOB: {
        type: String
    }
})

const People = mongoose.model('People', PeopleSchema);

module.exports = People;