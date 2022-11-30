import amadeus from './amadeus.js';
import express from 'express';




const router = express.Router();

const API = `api`;


router.get(`/${API}/shopping/activities`, async(req, res) => {
console.log('This is the activities ', req.query);
const {latitude , longitude} = req.query

try{
    const response = await amadeus.shopping.activities.get({
        latitude: latitude,
        longitude: longitude,
        radius: 20
    })
    await res.json(JSON.parse(response))
    //console.log(response);
}catch(err){
    await res.json(err)
}
})

export default router;