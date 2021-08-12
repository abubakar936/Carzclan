const express=require("express");
const { check_manufacturer } = require("../middleware/car_manufactuers");
const { Car_manufactuers } = require("../models/car_manufacturers");
const { car_manufactuers_validation } = require("../validation/car_manufactuers");
const router=express.Router();


router.post('/add_manufactuer',check_manufacturer,async(req,res)=>{
    const result = car_manufactuers_validation(req.body);
    if (result.error != null)
    {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    const new_manufacturer = new Car_manufactuers
    ({
        name: req.body.name,
        logo: req.body.logo,
        thumnail: req.body.thumnail
    })
    const add_manufacturer= await new_manufacturer.save();
    return res.send
    ({
        success: true,
        message: "Manufacturer add successfully",
    })

})

module.exports = router;