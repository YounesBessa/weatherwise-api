
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createError } = require("../error.js");
const userModel = require('../models/userModel.js')


module.exports.userRegister = async (req, res, next)=>{

        const {userName, email, password, confirmPassword} = req.body;

        if(!userName){
            next(createError(400, 'Please Provide your username!'))
        }
        if(!email){
            next(createError(400, 'Please Provide your Email!'))
        }
        if(!password){
            next(createError(400, 'Please Provide your Password!'))
        }
        if(!confirmPassword){
            next(createError(400, 'please provide your Confirm-Password'))
        }
        if(password && confirmPassword && password !== confirmPassword){
             next(createError(400, 'Password and Confirm Password not Matched'))
        }
        if(password && password.length < 6 ){
            next(createError(400, 'please provide minimum 6 charetars'))
        }
        if( userName && email && password && password.length >= 6 && confirmPassword.length >=6 ){
            try{
                const checkUser = await userModel.findOne({email: email});
                if(checkUser){
                    next(createError(404, 'your email already existed'))
                }else{
                    const userCreate = await userModel.create({
                        userName,
                        email,
                        password: await bcrypt.hash(password,10)
                    })
                    if(userCreate){
                        const token = jwt.sign({
                            id : userCreate._id,
                            userName : userCreate.userName,
                            email : userCreate.email,
                            registerTime : userCreate.createAt
                        },process.env.SECRET_KEY,{expiresIn : process.env.TOKEN_EXP})
                        const options =  {
                            expires : new Date(Date.now() + process.env.COOKIE_EXP*24*60*60*1000),
                            httpOnly: true,
                            secure: true,
                            signed:true,
                            secret: "secret",
                            sameSite:"none"
                        }
                        res.status(201).cookie("authToken", token, options).json({
                            success: true,
                            successMessage: 'Registar Successfully', token
                        });
                    }  
                    else{
                        next(createError(500, 'Cookie set unsuccessfully'))
                    }
                }
            }catch(err){
                next(createError(500, ' Internal Server Error'))
            }
        }
}

module.exports.userLogin = async (req, res, next)=>{

  

    const {email, password} = req.body;

    if(!email){
        next(createError(400, 'Please Provide your username!'))
    }
    if(!password){
        next(createError(400, 'Please Provide your password!'))
    }
    if(email && password ){
        try{
            const checkUser = await userModel.findOne({email: email}).select('+password');

            if(checkUser){
                const matchedPassword = await bcrypt.compare(password,checkUser.password);

                if(matchedPassword){
                    const token = jwt.sign({
                        id : checkUser._id,
                        userName : checkUser.userName,
                        email : checkUser.email,
                        profilePicture :checkUser.profilePicture,
                        coverPicture : checkUser.coverPicture,
                        registerTime : checkUser.createAt
                    },process.env.SECRET_KEY,{expiresIn : process.env.TOKEN_EXP})
                    const options =  {
                        expires : new Date(Date.now() + process.env.COOKIE_EXP*24*60*60*1000),
                        httpOnly: true,
                        secure: true,
                        signed:true,
                        secret: "secret",
                        sameSite:"none"
                    }
                    res.status(201).cookie("authToken", token, options).json({
                        success: true,
                        successMessage: 'Login Successfully', token
                    });
                }  
                else{
                    next(createError(400, 'Your password not valid'))
                }
            }else{
                next(createError(400, 'Your Email Not Found'))
            }
        }catch(error){
            console.log(error)
        }
    }
}