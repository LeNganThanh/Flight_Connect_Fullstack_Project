import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

// ===> Setting the server 
const app = express()
const PORT = 4000
app.use(morgan('dev'));
 

// ===> Set up mongoose
const url  = process.env.URL
mongoose.connect(url, ()=> console.log('Connected to mongo atlas'))

















app.listen(PORT, () => console.log('Listening to the port:', PORT));


