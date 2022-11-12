import express from 'express'
import router from './router'
import morgan from 'morgan'
import * as path from 'path'
import mongoose from 'mongoose'
 // ===> path





// ===> Setting the server 
const app = express()
const PORT = 4000
app.use(morgan('dev'));

//===> Applying handler for API

app.use('/', router )

//===> Static files
app.use(express.static(path.join(__dirname, '../react/build'))) //===> IMPORTANT: This is the connection with the front end


 


app.listen(PORT,() =>{
    console.log('Server is running on port:', PORT);
})

// ===> Set up mongoose
/* const url  = process.env.URL
mongoose.connect(url, ()=> console.log('Connected to mongo atlas'))
 */
















app.listen(PORT, () => console.log('Listening to the port:', PORT));


