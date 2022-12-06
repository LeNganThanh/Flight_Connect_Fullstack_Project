import axios from 'axios'
import express from "express";
import { GOOGLE_KEY } from './config.js';

const router = express.Router();

const API = `api`;


router.get(`/${API}/activities`, async(req, res) => {
  try{
    const geo = `${req.query.latitude},${req.query.longitude}`
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geo}&radius=50000&type=tourist_attraction&language=en&key=${GOOGLE_KEY}`,
      headers: { }
    };
    const response = await axios(config).catch(err => console.log(err))
    const activities = response.data
    // let photos = []
    // for (let i = 0; i < 2; i++) {
    //   const config = {
    //     method: 'get',
    //     url: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${activities.results[i].photos[0].photo_reference}&key=${GOOGLE_KEY}`,
    //     headers: { }
    //   };
    //   const response = axios(config).catch(err => console.log(err))
    //   photos.push(response.data.toDataUrl('image/png'))
    // }
    // console.log(photos)
    //res.send([activities, photos])
    res.send([activities, []])
  }catch(err){
    res.json(err)
  }
});

export default router;
