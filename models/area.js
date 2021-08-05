
const mongoose = require('mongoose');

const city_area_Schema = new mongoose.Schema
    ({
        cityid: {
            type: mongoose.Schema.Types.ObjectId,
        },
        area_name:{
            type: String,
            required: true,
      
        }
    })

const City_area = mongoose.model('City_area', city_area_Schema);
module.exports.City_area = City_area;