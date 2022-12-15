import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Deals.module.css';
import DealDisplay from './dealDisplay.js';
import { getAirport } from '../../api/airport.api.js';

const Deals = () => {
  const [geoInfo, setGeoInfo] = useState(false);

  useEffect(() => {
    if (!geoInfo) {
      const getData = async () => {
        const ip = await axios
          .get(`https://geolocation-db.com/jsonp/`)
          .then(res => res.data.split(',')[6].slice(8, -1));
        let lat;
        let long;
        await axios.get(`http://www.geoplugin.net/json.gp?ip=${ip}`).then(res => {
          lat = (Number(res.data.geoplugin_latitude) + 0.000069).toFixed(6);
          long = (Number(res.data.geoplugin_longitude) + 0.000069).toFixed(6);
        });
        const airport = await getAirport({
          latitude: lat,
          longitude: long,
          radius: 100,
          sort: 'distance',
        });
        const airports = airport.data.data.slice(0, 5);
        let airportCodes = [];
        airports.map(port =>
          airportCodes.push({
            iataCode: port.iataCode,
            cityName: port.address.cityName,
            countryCode: port.address.countryCode,
            countryName: port.address.countryName,
            geoCode: port.geoCode,
          })
        );

        setGeoInfo(airportCodes);
      };
      getData();
    }
  }, [geoInfo]);

  return (
    <React.Fragment>
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
      </div>

      <div className={classes['info-box']}>
        {geoInfo ? <DealDisplay geoInfo={geoInfo} /> : null}
      </div>
    </React.Fragment>
  );
};

export default Deals;
