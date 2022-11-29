import React, { useEffect } from 'react';
import axios from 'axios';
import { getTours } from '../../api/activities.api.js';
import { getDeals } from '../../api/deals.api.js';
const Tours = () => {

  useEffect(() =>{

    const dateOfDeparture = document.getElementById('departureDate');
    const dateOfReturn = document.getElementById('returnDate');

    const getData = async() => {

      const ip = await axios
          .get(`https://geolocation-db.com/jsonp/`)
          .then(res => res.data.split(',')[6].slice(8, -1));
       
      const geoData = await axios
          .get(`http://www.geoplugin.net/json.gp?ip=${ip}`)
          .then(res => ({
            latitude: res.data.geoplugin_latitude, 
            longitude: res.data.geoplugin_longitude, 
            dateOfDeparture: dateOfDeparture.value,
            dateOfReturn: dateOfReturn.value
          }))

      const airport = await getTours(geoData)

      const iataCode = await airport.data.data[0].iataCode

      const deals = await getDeals(iataCode)

      const result = deals

      console.log('res', result)

      return result
    }

    getData()

  }, [])

  return <div>This is a test</div>;
};

export default Tours;
