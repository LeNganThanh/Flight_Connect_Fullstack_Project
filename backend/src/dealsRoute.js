import axios from 'axios';
import express from 'express';
import { USER_ID, USER_PASS } from './config.js';


const router = express.Router();

const API = `api`;


router.get(`/${API}/deals`, async(req, res) => {

  let userId = Buffer.from(USER_ID, 'utf-8').toString('base64')
  let userPass = Buffer.from(USER_PASS, 'utf-8').toString('base64')
  let concat = `${userId}:${userPass}`
  const encodedConcat = Buffer.from(concat).toString('base64')
  

  try{
    const data = {
      grant_type: 'client_credentials',
    }

    const token = await axios.post('https://api-crt.cert.havail.sabre.com/v2/auth/token', data, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+encodedConcat,
    }})
    
    const access = token.data.access_token
    
    let query = `origincountry=${'DE'}&lookbackweeks=12`
    
    const response = await axios.get(`https://api-crt.cert.havail.sabre.com/v1/lists/top/destinations?${query}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      }
    })

    query = `origin=${req.query.iataCode}&departuredate=${req.query.dateOfDeparture}&returndate=${req.query.dateOfReturn}&pointofsalecountry=${'DE'}` 

    const response2 = await axios.get(`https://api-crt.cert.havail.sabre.com/v2/shop/flights/fares?${query}`, {
      headers: {
        Authorization: `Bearer ${access}`
      }
    })

    console.log(response2)

    const result = [response.data, response2.data]

    res.send(result)
  }catch(err){
    console.log(err)
    res.json(err)
  }
})

export default router;
