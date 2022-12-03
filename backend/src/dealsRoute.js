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

  const geoInfo = JSON.parse(req.query.geoInfo)
  console.log(geoInfo)
  

  try{
    const data = {
      grant_type: 'client_credentials',
    }

    const token = await axios.post('https://api-crt.cert.havail.sabre.com/v2/auth/token', data, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+encodedConcat,
    }})
    
    const access = token.data.access_token
    

    const countryCode = geoInfo[0].countryCode
    let query = `origincountry=${countryCode}&lookbackweeks=12`
    
    const topDestinations = await axios.get(`https://api-crt.cert.havail.sabre.com/v1/lists/top/destinations?${query}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      }
    })

    const getInspiration = async() => {
      let gotFlightInspiration = undefined
      let count = 0
      while(gotFlightInspiration === undefined  && count < 5) {
        console.log(geoInfo[count])

      query = `origin=${geoInfo[count].iataCode}&departuredate=${req.query.dateOfDeparture}&returndate=${req.query.dateOfReturn}&pointofsalecountry=${geoInfo[count].countryCode}` 

      const result = await axios.get(`https://api-crt.cert.havail.sabre.com/v2/shop/flights/fares?${query}`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      })

      gotFlightInspiration = result
      
      count++
      }
      console.log('-------HI', topDestinations)
      return gotFlightInspiration
    }
    const flightInspiration = await getInspiration()

    res.send([topDestinations.data, flightInspiration.data])
  }catch(err){
    console.log(err)
    res.json(err)
  }
})

export default router;
