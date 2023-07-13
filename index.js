const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const databaseConnecte = require('./database/database');
const routes = require('./routes/index.js')

const app = express()

dotenv.config();
app.use(cors({
    origin: 'https://client-weatherwise.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

app.use(express.json({
    type:['application/json','text/plain','application/x-www-form-urlencoded']
}));
app.use(cookieParser("secret"));

app.use(routes);


app.get('/', (req,res)=>{
    res.send('ok');
})

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const errorMessage = err.errorMessage || "Somthing went wrong! ";
    return res.status(status).json({
        success: false,
        status,
        errorMessage
    })
})

databaseConnecte();
const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{
    console.log(`Server is Running on PORT ${PORT}`)
})