import amadeus from './amadeus.js';
import express from 'express';



const router = express.Router();

const API = `api`;


router.get(`/${API}/booking/price`, async(req, res) =>{
  
  try {
    const offer = JSON.parse(req.query.offer)
    
    const response = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        'data': {
          'type': 'flight-offers-pricing',
          'flightOffers': [offer]
        }
      })
    )   

    console.log(JSON.parse(response.body).data)
    res.json(JSON.parse(response.body))
  } catch(err) {
    console.log(err.description)
    res.json(err)
  }

})

router.post(`${API}/booking/order`, async(req, res) => {

  try {
    const flight = req.body.flight;
    const name = req.body.name
    const response = await amadeus.booking.flightOrders.post(
      JSON.stringify({
        'data': {
          'type': 'flight-order',
          'flightOffers': [flight],
          'travelers': [{
            "id": "1",
            "dateOfBirth": "1982-01-16",
            "name": {
              "firstName": name.first,
              "lastName": name.last
            },
            "gender": "MALE",
            "contact": {
              "emailAddress": "jorge.gonzales833@telefonica.es",
              "phones": [{
                "deviceType": "MOBILE",
                "countryCallingCode": "34",
                "number": "480080076"
              }]
            },
            "documents": [{
              "documentType": "PASSPORT",
              "birthPlace": "Madrid",
              "issuanceLocation": "Madrid",
              "issuanceDate": "2015-04-14",
              "number": "00000000",
              "expiryDate": "2025-04-14",
              "issuanceCountry": "ES",
              "validityCountry": "ES",
              "nationality": "ES",
              "holder": true
            }]
          }]
        }
      })
    )
    res.json(response)

  } catch(err) {
    console.log(err.description)
    res.json(err)
  }

})

export default router
