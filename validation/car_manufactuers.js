const Joi= require('joi');

//      Validation for new car manufactuers       //

function car_manufactuers_validation(manufactuer)
{
    const joi_manufactuers_Schema = Joi.object
    ({
        name: Joi.string().min(2).required(),
        logo:Joi.string().required(),
        thumnail:Joi.string().required(),
    })
 return result = joi_manufactuers_Schema.validate(manufactuer); 

}

//      Validation for updating car manufactuers       //

function update_manufactuers_validation(manufactuer)
{
    const joi_manufactuers_Schema = Joi.object
    ({
        name: Joi.string().min(2).required(),
        logo:Joi.string().required(),
        thumnail:Joi.string().required(),
    })
 return result = joi_manufactuers_Schema.validate(manufactuer); 

}


module.exports.car_manufactuers_validation = car_manufactuers_validation;
module.exports.update_manufactuers_validation = update_manufactuers_validation;
