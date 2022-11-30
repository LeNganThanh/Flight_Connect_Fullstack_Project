import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Deals.module.css';
import DealDisplay from './dealDisplay.js'
import ActivityDisplay from './activityDisplay.js'

const Deals = () => {
  const [geo, setGeo] = useState(false)

  useEffect(() =>{

    const getData = async() => {

      const ip = await axios
          .get(`https://geolocation-db.com/jsonp/`)
          .then(res => res.data.split(',')[6].slice(8, -1));
       
      const geoData = await axios
          .get(`http://www.geoplugin.net/json.gp?ip=${ip}`)
          .then(res => ({
            latitude: res.data.geoplugin_latitude, 
            longitude: res.data.geoplugin_longitude
          }))

      console.log("geoData", geoData)
      return geoData
    }

    setGeo(getData())

  }, [])

  return (
    <div className={classes['info-box']}>
      <div className={classes.box}>
        <div>
          <img
            src="https://content.skyscnr.com/m/139a24f17c26c197/original/p1.svg"
            alt="earth"
          />
        </div>
        <div>
          Explore the best flight deals from anywhere to everywhere, then book
          with no fees
        </div>
      </div>
      <div className={classes.box}>
        <div>
          <img
            src="https://content.skyscnr.com/m/fb0225dc3a121a8/original/p2.svg"
            alt="flights"
          />
        </div>
        <div>
          Compare flight deals from over 1,000 providers, and choose the
          cheapest, fastest or greenest tickets.
        </div>
      </div>
      <div className={classes.box}>
        <div>
          <img
            src="https://content.skyscnr.com/m/1993238bdcb0895f/original/p3.svg"
            alt="deals"
          />
        </div>
        <div>
          Find the cheapest month – or even day – to fly, and set up Price
          Alerts to book when the price is right
        </div>
      </div>

      {geo ? <ActivityDisplay geo={geo} /> : null}
      {geo ? <DealDisplay geo={geo} /> : null}
    </div>
  );
};

export default Deals;
