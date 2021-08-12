const mongoose=require("mongoose");

const car_manufactuers_schema=new mongoose.Schema
({
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:2,
        maxlength:25
    },
    logo:{
        type:String,
        required:true,
    },
    thumnail:{
        type:String,
        required:true,
    }
})
const Car_manufactuers=mongoose.model('Car_manufactuers',car_manufactuers_schema);
module.exports.Car_manufactuers=Car_manufactuers;