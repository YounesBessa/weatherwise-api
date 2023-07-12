const router = require('express').Router();
const {weatherInput, forecastWeather, currentWeather} = require('../controller/weatherController')

router.post('/weather-input',  weatherInput);
router.get('/forecast-weather',  forecastWeather);
router.get('/current-weather' , currentWeather)

module.exports = router;