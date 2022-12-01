
import React, { useEffect } from "react";
//import axios from "axios";
import { getAirport } from "../../api/airport.api.js";
//import { getDeals } from "../../api/deals.api.js";

const DealDisplay = props => {
  useEffect(() => {
    const getData = async () => {
      const geo = await props.geo;

      const airport = await getAirport({
        latitude: geo.latitude,
        longitude: geo.longitude,
      });
      // console.log(airport)

      return airport;
      //
      // const iataCode = airport.data.data[0].iataCode
      // const deals = await getDeals(iataCode)
      // const result = deals
      // console.log('res', result)
      // return result
    };


    getData();
  }, [props.geo]);


  return <div>This is a test</div>;
};

export default DealDisplay;
