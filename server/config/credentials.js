import allowedOrigins from "../midldleware/allowed_origins.js";

const credentials = (req, res, next)=>{
    const origin = req.headers.origin

    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin', true)
    }

    next()
}

export default credentials;