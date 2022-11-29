import amadeus from './amadeus.js';
import express from 'express';

const router = express.Router();

const API = `api`;

router.get(`/${API}/deals`, async(req, res) => {

  try{
      const response = await amadeus.client.get('/v1/shopping/flight-destinations', {
          origin: req.query.iataCode
      })
      res.json(JSON.parse(response))
  }catch(err){
      console.log('oops2')
      res.json(err)
  }
})

export default router;
