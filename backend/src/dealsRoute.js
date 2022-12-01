import axios from 'axios';
import express from 'express';
import { USER_ID, USER_PASS } from './config.js';


const router = express.Router();

const API = `api`;


router.get(`/${API}/deals`, async(req, res) => {

  let userId = Buffer.from(USER_ID, 'utf-8').toString('base64')
  let userPass = Buffer.from(USER_PASS, 'utf-8').toString('base64')
  let concat = []
  userId.split('').map(letter => concat.push(letter))
  concat.push(':')
  userPass.split('').map(letter => concat.push(letter))
  let concatStr = concat.join('')
  const encodedConcat = Buffer.from(concatStr).toString('base64')

  try{
    const data = {
      grant_type: 'client_credentials',
    }

    const token = await axios.post('https://api-crt.cert.havail.sabre.com/v2/auth/token', data, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+encodedConcat,
    }})
    
    const access = token.data.access_token

    const response = await axios.get(`https://api-crt.cert.havail.sabre.com/v1/lists/top/destinations?origin=FRA&lookbackweeks=12`, {
      headers: {
        Authorization: `Bearer ${access}`,
      }
    })
    console.log(response.data);
    res.send(response.data)
  }catch(err){
    console.log(err)
    res.json(err)
  }
})

export default router;
