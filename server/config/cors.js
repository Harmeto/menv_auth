import allowedOrigins from '../midldleware/allowed_origins.js';

const corsOptions = {
    origin: (origin, callback)=>{
        if(allowedOrigins.includes(origin) || !origin){
            callback(null, true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    }
}

export default corsOptions;