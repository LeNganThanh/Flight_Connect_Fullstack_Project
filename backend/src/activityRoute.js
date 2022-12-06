import axios from 'axios'
import express from "express";
import { GOOGLE_KEY } from './config.js';

import GooglePlacesApi from 'dcts-google-places-api';
const apiKey = GOOGLE_KEY;
const googleapi = new GooglePlacesApi(apiKey)

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
    let activities = response.data.results.filter(act => act.photos)

    const getPhotos = async() => {
      let photos = []
      let count = 0 
      while (count < activities.length) {
        const photoReference = activities[count].photos[0].photo_reference
        const photo = await googleapi.runPlacePhotos(photoReference)
        photos.push(String(photo))
        count++
      }
      return photos
    }

    const photos = await getPhotos()

    res.json([activities, photos])
  }catch(err){
    res.json(err)
  }
});

export default router;
