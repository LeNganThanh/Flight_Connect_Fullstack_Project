import Amadeus from 'amadeus';

import { CLIENT_ID, CLIENT_SECRET } from './config';

export const router = express.Router(); //===> require ("express").Router

const API = `api`;
const amadeus = new Amadeus({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
});

router.get(`/${API}/airports`, async (req, res) => {
  const { page, subType, keyword } = req.query;
  //===> This API params we requested from the client
  const response = await amadeus.client.get('/v1/reference-data/locations', {
    keyword,
    subType,
    'page[offset]': page * 10,
  });

  //===> Sending the client a response

  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});
