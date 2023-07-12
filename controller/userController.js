
const bcrypt = require('bcrypt');

const userModel = require('../models/userModel.js');
const { createError } = require("../error.js");

module.exports.updateUser = async (req, res, next)=>{
    try{
        const id = req.params.id;
        const userData = await userModel.findByIdAndUpdate(id, req.body );
        if(userData){
            res.status(200).json({successMessage : 'User Update Successfull'})
        }else{
            res.json({successMessage: 'User Not Found'})
        }
    }catch(error){
        console.log(error)
        next(createError(500, ' Internal Server Error'))
    }
}

module.exports.passUpdate = async(req, res, next)=>{
    try{

        const id = req.params.id;
        const {password, newPassword} = req.body;

        const user = await userModel.findById({_id: id}).select('+password')
     
        if(user){
            const matchPass = await bcrypt.compare(password, user.password)
         
            if(matchPass){

                const bcryptPass = await bcrypt.hash(newPassword,10)

                const pass = await userModel.findByIdAndUpdate(id, {password: bcryptPass} );
                if(pass){
                
                    res.status(200).json({success : true, successMessage : 'Password Update Successfull'})
                }
            }else{
                next(createError(400, 'Old Password is Not Matched'))
            }
        }else{
            next(createError(400, 'User Not Found'))
        }
    }catch(error){
        console.log(error)
        next(createError(500, ' Internal Server Error catch'))
    }  

}

module.exports.findUser = async(req, res, next)=>{
    try{
        const id = req.params.id
        const user = await userModel.findById({_id : id})
        res.status(200).json({user})
        
    }catch(error){
        next(createError(500, 'Internal Server Error'))
    }
}