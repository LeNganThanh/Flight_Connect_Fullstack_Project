import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
dotenv.config()

// ===> Setting the server 
const app = express()
const PORT = 4000
app.use(morgan('dev'));















app.listen(PORT, () => console.log('Listening to the port:', PORT));


