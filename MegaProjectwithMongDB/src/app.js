import express from 'express'
import cors from 'cors';
const app = express()

// basic configuration
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true,limit : '16kb'}))
app.use(express.static('public;'))

// cors configuration 
app.use(cors({
    origin : process.env.CORS_ORIGIN?.split(',') ,
    Credential : true,
    method : ['GET','POST', 'PUT', 'PATCH','DELETE','OPTIONS'],
    allowHeader : ['Content-Type', 'Authorization']
}))

// import the routes

import { healthCheckRouter } from './routes/healthcheck.routes.js';
app.use("/api/v1/healthCheck",healthCheckRouter)
 
app.get('/',(req,resp) =>{
    resp.send('my page from app .js')
})
export default app;