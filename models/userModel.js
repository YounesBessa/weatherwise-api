const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        min: 3,
        max: 20,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 8,
      }
},{timestamps :true });

module.exports = mongoose.model('users', userModel);