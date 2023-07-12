const mongoose = require('mongoose');

const currentWeatherModel = mongoose.Schema({

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

module.exports = mongoose.model('currentweathers', currentWeatherModel);