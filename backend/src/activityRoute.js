import amadeus from "./amadeus.js";
import express from "express";

const router = express.Router();

const API = `api`;


router.get(`/${API}/activities`, async(req, res) => {
  const {latitude, longitude} = req.query


  try {
    const response = await amadeus.shopping.activities.get({
      latitude: latitude,
      longitude: longitude,
      radius: 20,
    });

    res.json(JSON.parse(response.body));
  } catch (err) {
    console.log("oops");
    res.json(err);
  }
});

export default router;
