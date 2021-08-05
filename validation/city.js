const Joi = require('joi');
function cityValidation(city) {
   const joicitySchema = Joi.object
      ({
         
        city_name: Joi.string().required().min(1).max(120),
      })
   return result = joicitySchema.validate(city);
}

module.exports.cityValidation = cityValidation;


