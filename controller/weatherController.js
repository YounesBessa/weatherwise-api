
const { createError } = require("../error.js")
const forecastWeatherModel = require('../models/forecastWeatherModel.js')
const currentWeatherModel = require('../models/currentWeatherModel.js')

module.exports.weatherInput = async (req, res, next)=>{

    const {dayname ,lighting , temperature, humidity} = req.body;

    try{
        const weatherSave = await forecastWeatherModel.create({
         dayname, lighting, temperature, humidity
        })
        res.status(201).json({weatherSave})

    }catch(error){
        console.log(error)
        next(createError(500, 'Internal Server Error'))
    }
}

module.exports.forecastWeather = async(req, res, next)=>{
    
    try{
        const data = await forecastWeatherModel.find()
        res.json({data: data})
    }catch(error){
        console.log(error)
        next(createError(500, 'Internal Server Error'))
    }
}

module.exports.currentWeather = async(req, res, next)=>{
    try{

        const data = await currentWeatherModel.find().sort({_id: -1}).limit(1);
        res.json({data: data})

    }catch(error){
        console.log(error)
        next(createError(500, 'Internal Server Error'))
    }
}