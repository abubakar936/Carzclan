
const Joi = require('joi');
function userValidation(user) {
   const joiUserSchema = Joi.object
      ({
         first_name: Joi.string().required().min(1).max(120),
         last_name: Joi.string().required().max(120),
         contact: Joi.number().min(3),
         email: Joi.string().email().required().min(3).max(120),
         password: Joi.string().min(6).max(1024).required(),
      })
   return result = joiUserSchema.validate(user);
}

module.exports.userValidation = userValidation;