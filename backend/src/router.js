import amadeus from './amadeus.js';
import express from 'express';

import { CLIENT_ID, CLIENT_SECRET } from './config.js';

const router = express.Router(); //===> require ("express").Router

const API = `api`;

router.get(`/${API}/airports`, async (req, res) => {
  const { page, subType, keyword } = req.query;
  //===> This API params we requested from the client

  //===> Sending the client a response

  try {

    const response = await amadeus.client.get('/v1/reference-data/locations', {
      keyword,
      subType,
      'page[offset]': page * 10,
    });

    await res.json(JSON.parse(response.body));

  } catch (err) {

    await res.json(err);
  }
});

export default router;
