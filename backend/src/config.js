import dotenv from 'dotenv'

dotenv.config()

// Exporting the variables 
const CLIENT_ID = process.env.CLIENT_ID
const  CLIENT_SECRET = process.env.CLIENT_SECRET
export { CLIENT_ID, CLIENT_SECRET}


