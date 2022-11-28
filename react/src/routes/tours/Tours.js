import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getTours } from '../../api/activities.api';
const Tours = () => {
  const [ip, setIp] = useState('');
  const [geoData, setGeoData] = useState('')

  useEffect(() => {
    axios
      .get(`https://geolocation-db.com/jsonp/`)
      .then(res => setIp(res.data.split(',')[6].slice(8, -1)));
    
  }, []);

  useEffect(() => {
   axios.get(`http://www.geoplugin.net/json.gp?ip=${ip}`)
   .then(res => setGeoData(res.data))
  },[ip])

  useEffect(() =>{
    /* console.log(geoData); */
    const out =  getTours({'latitude': geoData.geoplugin_latitude , 'longitude': geoData.geoplugin_longitude})
   out.then(result => console.log(result)) 
  }, [geoData])

  return <div>This is a test</div>;
};

export default Tours;
