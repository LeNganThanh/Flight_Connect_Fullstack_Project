import axios from 'axios'
import express from "express";
import { GOOGLE_KEY } from './config.js';

const router = express.Router();

const API = `api`;


router.get(`/${API}/google`, async(req, res) => {
  try{
    const geo = `${req.query.latitude},${req.query.longitude}`
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geo}&radius=50000&type=tourist_attraction&language=en&key=${GOOGLE_KEY}`,
      headers: { }
    };
    const response = await axios(config).catch(err => console.log(err))
    res.json(response.data)
  }catch(err){
    res.json(err)
  }
});

export default router;
