const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const userSchema = new mongoose.Schema
   ({
      first_name:
      {
         type: String,
         required: true,
         maxlength: 120,
      },
      last_name:
      {
         type: String,
         required: true,
         maxlength: 120,
      },
      contact:
        {
            type: String,
            maxlength: 13,
        },
      email:
      {
         type: String,
         required: true,
         unique: true,
         index: true
      },
      password:
      {
         type: String,
         required: true,
         minlength: 6,
         maxlength: 1040
      },
      email_varification:
      {
         type: Boolean,
         default: false
      },
      confirmation_code:{
         type: String,
      },
      //dfbjh
    
   })
console.log(process.env.JWTPRIVATEKEY)
   //we cant use arrow function in below fuctions because arrow function dont have this property 
userSchema.methods.generateAuthToken=function()
  {
   const token=jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY)
   return token 
  } 
const User = mongoose.model('User', userSchema);
module.exports.User = User;

