import dotenv from 'dotenv'

dotenv.config()

// Exporting the variables 
const CLIENT_ID = process.env.CLIENT_ID
const  CLIENT_SECRET = process.env.CLIENT_SECRET
const USER_ID = process.env.USER_ID
const USER_PASS = process.env.USER_PASS
export { CLIENT_ID, CLIENT_SECRET, USER_ID, USER_PASS }


