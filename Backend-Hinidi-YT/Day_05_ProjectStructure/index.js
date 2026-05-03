import { app } from './app.js';
import connectDB from './src/db/db.connect.js';
import dotenv from "dotenv"
dotenv.config({path : './env'})

connectDB() 
.then(()=>{
    app.listen(process.env.PORT || 8000)
    console.log(`Server is runing at  http://localhost:${process.env.PORT}`);
    
})
.catch((err)=>console.log("MongoDB connection failed",err)
)
// import express from "express"
// import dotenv from "dotenv"
// dotenv.config({
//   path: './.env',
// });     
// const app = express()
// try { 
//     //iffe function {}{}
//     { async ()=>{
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.log("error found",error)
//             throw error
//         } 
//         )
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listenign on port : ${process.env.PORT}`);
            
//         })
//         console.log("db connected succesfully");
        
//     }
// }
//     {}
    
// } catch (error) {
//     console.log("Error Ocurred while coneecting DB",error);
// }