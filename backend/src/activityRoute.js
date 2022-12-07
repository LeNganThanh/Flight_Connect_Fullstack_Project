import axios from 'axios'
import express from "express";
import { GOOGLE_KEY } from './config.js';
import googleapi from './googleapi.js'

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
    let activ = response.data.results
    const activities = activ.filter(act => act.photos)

    // const getDetails = async() => {
    //   let details = []
    //   let count = 0
    //   while (count < activities.length) {
    //     const placeId = activities[count].place_id
    //     const detail = await googleapi.runPlaceDetails(placeId)
    //     details.push(detail)
    //     count++
    //   }
    //   return details
    // }

    // const details2 = await getDetails()
    // details2.length
    // const details = details2.filter(detail => detail.photos)
    // console.log(details.length)
    
    console.log(activities)

    const getPhotos = async() => {
      let photos = []
      let count = 0 
      while (count < activities.length) {
        // let count2 = 0
        // let photos2 = []
        // while (count2 < details[count].photos.length && count2 < 3) {
          const photoReference = activities[count].photos[0].photo_reference
          const photo = await googleapi.runPlacePhotos(photoReference).catch(err => console.log(err))
          // photos2.push(photo)
          // count2++
        // }
        photos.push([photo])
        count++
      }
      return photos
    }

     const photos = await getPhotos()

    res.json([activities, photos])
  }catch(err){
    console.log(err)
    res.json(err)
  }
});

export default router;
