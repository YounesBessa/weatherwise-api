const mongoose = require('mongoose');

const databaseConnecte = () =>{
    mongoose.connect(process.env.DB_URL + 'weatherwisedb',{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then( ()=>{
        console.log('MongoDB Database connected...')  
    }).catch( (error)=>{
        console.log(error)
    })
}

module.exports = databaseConnecte;