import amadeus from "./amadeus.js";
import express from "express";

const router = express.Router();

const API = `api`;

router.get(`/${API}/activities`, async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const response = await amadeus.shopping.activities.get({
      latitude: 41.397158,
      longitude: 2.160873,
      radius: 20,
    });
    console.log(response);
    res.json(JSON.parse(response.body));
  } catch (err) {
    console.log("oops");
    res.json(err);
  }
});

export default router;
