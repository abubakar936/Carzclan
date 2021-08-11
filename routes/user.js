const express = require('express');
const Joi = require('joi');
const { User } = require('../models/user');
const { userValidation } = require('../validation/users');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();


router.post('/signup', async (req, res) => {
    var confirmation_code=Math.floor(100000 + Math.random() * 900000)
    console.log(confirmation_code);
    const result = userValidation(req.body);
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }  
    console.log(req.body);
    let new_user = await User.findOne({ email: req.body.email });
    console.log(new_user)
    if (new_user != null) {
        return res.json
            ({
                success: false,
                message: "Email alredy registerd",
            })
    }
    
        
        console.log("im inside try catch");
        
        console.log("this is email ",process.env.ADMIN_EMAIL);
        var transporter = nodemailer.createTransport
        ({
            service: 'gmail',
            auth:
            {
                user:process.env.ADMIN_EMAIL,
                pass:process.env.ADMIN_PASSWORD
            }
        });
      //  console.log(user,pass);

    var mailOptions;
    let sender = "BLACK BOOKING ORG"
    var mailOptions =
    {
        from: process.env.ADMIN_EMAIL,
        to: req.body.email,
        subject: 'Confirmation code',
        text: "Your Confirmation code is  "+confirmation_code
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.json({
                success: false,
                message: error,
            })
        }
      
    });
        const newUser = new User
            ({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password,
                confirmation_code:confirmation_code
            })
    const user= await newUser.save();
    const token=newUser.generateAuthToken();
    console.log(token)
        return res.header('x-auth-token',token).send
            ({
                success: true,
                message: "Account created successfully",
            })
    
  
})
// email and code verification

router.put('/code_verification',async (req, res) => {
    //console.log(req.user)
        try {
            const get_user = await User.findOne({ 
                email: req.body.email,
               
             })
            if (get_user == null)
                return res.json
                    ({
                        success: false,
                        error: "User does not exist",
                    })
            if( get_user.confirmation_code!=req.body.confirmation_code)
            {
                return res.json
                ({
                    success: false,
                    error: "Invalid code",
                })
            }
            if (get_user != null) {
                const getuser = await User.findOneAndUpdate({  email: req.body.email },
                    {
                        email_varification: true
                
                    },
                    { new: true }
                )
                return res.json
                    ({
                        success: true,
                        data: getuser,
                        message:"Email verification successfull",
                    })
            }
        }
        catch (err) {
            return res.status(500).json
                ({
                    success: false,
                    message: err,
                })
        }
    
    })

router.put('/resend_code',async (req, res) => {
    //console.log(req.user)
    const confirmation_code=Math.floor(100000 + Math.random() * 900000)    
    try {
            const get_user = await User.findOne({ 
                email: req.body.email,
                })
            if (get_user == null)
                return res.json
                    ({
                        success: false,
                        error: "User does not exist",
                    })
                    if (get_user.email_varification == true)
                    return res.json
                        ({
                            success: false,
                            error: "Email is already verified",
                        })
                    var transporter = nodemailer.createTransport
                    ({
                        service: 'gmail',
                        auth:
                        {
                            user: process.env.ADMIN_EMAIL,
                            pass: process.env.ADMIN_PASSWORD
                        }
                    });
            
                var mailOptions;
                let sender = "CarzClan"
                var mailOptions =
                {
                    from: process.env.ADMIN_EMAIL,
                    to: req.body.email,
                    subject: 'Confirmation code',
                    text: "Your new  confirmation code is  "+confirmation_code
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return res.json({
                            success: false,
                            message: error,
                        })
                    }
                    else {
                        return res.json({
                            success: true, 
                            message: "kindly Check your email for confirmation code",
                        })
                    }
                });
            if (get_user != null) {
                const getuser = await User.findOneAndUpdate({  email: req.body.email },
                    {
                        confirmation_code: confirmation_code
                
                    },
                    { new: true }
                )
                return res.json
                    ({
                        success: true,
                        data: getuser,
                        message:"Code sent successfully",
                    })
            }
        }
        catch (err) {
            return res.status(500).json
                ({
                    success: false,
                    message: err,
                })
        }
    
    })
//--------     login     --------//

router.post('/login', async (req, res) => {
    const result = logInValidation(req.body);
    if (result.error != null) {
        return res.json({
            success: false,
            status: 400,
            message: result.error.details[0].message
        })
    }
    try {
        var getUser = await User.findOne({
            email: { $regex: "^" + req.body.email, $options: 'i' },
            password: req.body.password
        })
        if (!getUser) {
            return res.json
                ({
                    success: false,
                    message: "user or password incorrect....",
                    status: 400
                })
        } 
        console.log(getUser.email_varification)
        if (getUser.email_varification==false) {
            const confirmation_code=Math.floor(100000 + Math.random() * 900000)
            const getuser = await User.findOneAndUpdate({  email: req.body.email },
                {
                    confirmation_code: confirmation_code
            
                },
                { new: true }
            )
            var transporter = nodemailer.createTransport
            ({
                service: 'gmail',
                auth:
                {
                    user: process.env.ADMIN_EMAIL,
                    pass: process.env.ADMIN_PASSWORD
                }
            });
    
        var mailOptions;
        let sender = "BLACK BOOKING ORG"
        var mailOptions =
        {
            from: process.env.ADMIN_EMAIL,
            to: req.body.email,
            subject: 'Confirmation code',
            text: "Your new confirmation code is  "+confirmation_code
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({
                    success: false,
                    message: error,
                })
            }
            else {
                return res.json({
                    success: true, 
                    message: "kindly Check your email for confirmation code",
                })
            }
        });
            return res.json
                ({
                    success: false,
                    message: "Email is not verified.Verification code is sent at your email address",
                    
                })
        } 

        if (getUser) {
            return res.json
                ({
                    success: true,
                    data: getUser,
                })
        }
    }
    catch (err) {
        return res.json
            ({
                success: false,
                error: err,
            })
    }
})


module.exports = router;