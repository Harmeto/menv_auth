import mongoose from "mongoose";

async function connect(){
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        });
    }catch(e){
        console.log(e)
    }
}

export default connect;