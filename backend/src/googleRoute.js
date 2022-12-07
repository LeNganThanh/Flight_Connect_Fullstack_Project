import express from "express";
import googleapi from './googleapi.js'
const router = express.Router();

const API = `api`;


router.get(`/${API}/google/details`, async(req, res) => {
  try{

    const placeId = req.query.placeId

    const details = await googleapi.runPlaceDetails(placeId)
      
    const getPhotos = async() => {
      let photos = []
      let count = 0 
      while (count < details.photos.length) {
        const photoReference = details.photos[count].photo_reference
        const photo = await googleapi.runPlacePhotos(photoReference)
        photos.push(photo)
        count++
      }
      return photos
    }

     const photos = await getPhotos()

    res.json(photos)
  }catch(err){
    console.log(err)
    res.json(err)
  }
});

export default router;
