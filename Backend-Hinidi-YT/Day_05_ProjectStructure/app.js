import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import UserRouter from "./src/routes/user.routes.js"
const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"})) // allow backend to accept jason data with a 16kb limit 

app.use(express.urlencoded({extended:true , limit : "16kb"})) // used to decode url ex: space is %20 in url 
app.use(express.static("public")) // used to store data on the server and later on we can use it further 
app.use(cookieParser())// used to set and get access of cookies of client browser 

// routes 
app.use('/api/v1/users',UserRouter)
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

export {app}