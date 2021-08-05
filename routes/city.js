const express = require('express');
const { City_area } = require('../models/area');
const router = express.Router();
const {City}=require("../models/city");
const { area_Validation } = require('../validation/area');

router.post('/submit', async (req, res) => {
    try { 
        const new_city = new City
        ({
            city_name:req.body.city_name,
        })
    const save_city = await new_city.save();
    //io.emit('Message', send_message);
//    console.log("message sent")
        return res.json
            ({
                success: true,
                message: "city is added",
                data:save_city
            })
    }
    catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
})

router.get('/all_cities', async (req, res) => {
    try {
        const get_city = await City.find({})
        console.log(get_city)
        if (get_city.length == 0)
            return res.json
                ({
                    success: false,
                    error: "there is no _city yet",
                })
        if (get_city.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_city,
                })
    }
    catch (err) {
        return res.json
            ({
                success: false,
                data: err,
            })
    }
})



router.post('/add_new_area', async (req, res) => {
   
    const result=area_Validation(req.body)
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
//add validation to check area exist or not 
    try {
        const new_area = new City_area
        ({
            cityid:req.body.cityid,
            area_name:req.body.area_name,
        })
        console.log(req.body)
        console.log(new_area)
    const save_area = await new_area.save();
        return res.json
            ({
                success: true,
                message: "Area is added",
                data:save_area
            })
    }
    catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
})

router.get('/all_areas/:city_id', async (req, res) => {
    try {
        const get_area = await City_area.find({cityid:req.params.city_id})
        console.log(get_area)
        if (get_area.length == 0)
            return res.json
                ({
                    success: false,
                    error: "There is no area yet",
                })
        if (get_area.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_area,
                })
    }
    catch (err) {
        return res.json
            ({
                success: false,
                data: err,
            })
    }
})

module.exports = router;
