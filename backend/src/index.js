import express from 'express'
import autocompRoute from './router.js'
import morgan from 'morgan'
import cors from 'cors';
import * as path from 'path'
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


// ===> Setting the server 
const app = express()
const PORT = 1338

app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:3000'
}));

//===> Applying handler for API

app.use('/', autocompRoute)

//===> Static files

app.use(express.static(path.join(__dirname, '../react/build'))) //===> IMPORTANT: This is the connection with the front end


app.listen(PORT,() =>{
    console.log('Server is running on port:', PORT);
})


