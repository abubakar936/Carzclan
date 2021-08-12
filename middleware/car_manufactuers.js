const { Car_manufactuers } = require("../models/car_manufacturers")

async function check_manufacturer(req,res,next)
{
    const result=await Car_manufactuers.findOne({name:req.body.name})
    {
        if(result!=null) {
            return res.json
            ({
                success: false,
                message: "manufacturer already exist ",
            })
        }
        next()
    }
}
module.exports.check_manufacturer=check_manufacturer