import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';

//local imports 
import corsOptions from './config/cors.js';
import connect from './config/database.js';
import credentials from './config/credentials.js';
import errorHandler from './midldleware/error_handler.js';
import authRouter from './routes/api/auth.js';

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();

//database
connect();

//alowedOrigins
app.use(credentials);

//CORS 
app.use(cors(corsOptions));


//aplication/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//aplication/json response
app.use(express.json());

//middleware for cookies 
app.use(cookieParser());

// static files 
app.use('/static', express.static(path.resolve("public")))

//errorHandlers
app.use(errorHandler);

//routes
app.use('/api/auth', authRouter)

app.all('*', (req, res)=>{
    res.status(404)

    if(req.accepts('json')){
        res.json({error: '404 not found'})
    }else{
        res.type('text').send('404 not found')
    }
})


mongoose.connection.once('open', ()=>{
    console.log('db conected ')
    app.listen(PORT, ()=>console.log(`server running at ${PORT}`))
})