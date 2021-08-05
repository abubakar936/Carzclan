const Joi = require('joi');
function area_Validation(area) {
   const joiareaSchema = Joi.object
      ({
         cityid: Joi.string().required(),
        area_name: Joi.string().required().min(1).max(120),
      })
   return result = joiareaSchema.validate(area);
}

module.exports.area_Validation = area_Validation;