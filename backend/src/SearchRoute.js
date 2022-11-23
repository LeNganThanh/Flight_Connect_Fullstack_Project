import Amadeus from 'amadeus';
import express from 'express';

import { CLIENT_ID, CLIENT_SECRET } from './config.js';

const router = express.Router();

const API = `api`;

const amadeus = new Amadeus({
    clientId : CLIENT_ID,
    clientSecret : CLIENT_SECRET,
});

router.get(`/${API}/offers`, async(req, res) =>{
    console.log('This is the query', req.query);
    const {originCode, destinationCode, dateOfDeparture, dateOfReturn} = req.query
    
    // ===> Cheapest flights
    if (dateOfReturn === '') {
      try{
          const response = await amadeus.shopping.flightOffersSearch.get({
              originLocationCode: originCode,
              destinationLocationCode: destinationCode,
              departureDate: dateOfDeparture,
              adults: '1',
              max: 20
          })
          await res.json(JSON.parse(response.body))
      }catch(err){
          await res.json(err)
      }
    } else {
      try{
          const response = await amadeus.shopping.flightOffersSearch.get({
              originLocationCode: originCode,
              destinationLocationCode: destinationCode,
              departureDate: dateOfDeparture,
              returnDate: dateOfReturn,
              adults: '1',
              max: 20
          })
          await res.json(JSON.parse(response.body))
      }catch(err){
          await res.json(err)
      }

    }
  
   
})

export default router
