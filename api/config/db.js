import mongoose from 'mongoose';

const connectDB =  async ()=>{

    try{
        const conn = await mongoose.connect("mongodb+srv://user:Icxe9vK30fZFALJH@cluster0.3ycqq.mongodb.net/todoapp",{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`mongo database is connected!!! ${conn.connection.host} `)
    }catch(error){
        console.error(`Error: ${error} `)
        process.exit(1) 
    }

}

export default connectDB
