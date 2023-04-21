import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv'
dotenv.config();

const dbConnection = async() => {
    try {
        mongoose.set('strictQuery', false);
         mongoose.connect(process.env.MONGODB_CNN)
        
        console.log(colors.green('Base de datos conectada'))
    }catch(error){
        throw new Error (`Se ha detectado un error ${error.red}`)
    }
}


export {dbConnection};