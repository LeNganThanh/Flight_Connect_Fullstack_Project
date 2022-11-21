import Amadeus from 'amadeus';
import express from 'express';

import { CLIENT_ID, CLIENT_SECRET } from './config.js';

const searchRouter = express.Router();

const API = `api`;

const amadeus = new Amadeus({
    clientId : CLIENT_ID,
    clientSecret : CLIENT_SECRET,
});

router.get(`/${API}/offers`, async(req, res) =>{
    console.log('hi');
    const {originCode, destinationCode, dateOfDeparture} = req.query
    
    // ===> Cheapest flights
    try{
        const response = await  amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: dateOfDeparture,
            adults: '1',
            max: '7'
        })
        await res.json(JSON.parse(response))
    }catch(err){
        await res.json(err)
    }
  
   
})

export default searchRouter