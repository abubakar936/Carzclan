const mongoose = require('mongoose');

const city_Schema = new mongoose.Schema
    ({
        city_name: {
            type: String,
            required: true,
            unqiue : true
        }
    })

const City = mongoose.model('City', city_Schema);
module.exports.City = City;