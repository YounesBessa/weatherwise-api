const mongoose = require('mongoose');

const forecastWeatherModel = mongoose.Schema({
    
    dayname: {
        type : String,
        max : 20,
    },
    lighting : {
        type: String,
        max : 10,
    },
    temperature : {
        type: String,
        max : 10,
    },
    humidity : {
        type: String, 
        max : 10,
    }


},{timestamps :true });

module.exports = mongoose.model('histories', forecastWeatherModel);