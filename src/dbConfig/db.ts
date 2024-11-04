import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.mogodb_url!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("mongo_DB coonected successfully")
        })
    }
    catch(err){
        console.error(err)
    }
}