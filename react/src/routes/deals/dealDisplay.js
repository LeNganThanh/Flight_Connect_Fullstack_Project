
import React, { useEffect } from 'react';
import { getAirport } from '../../api/airport.api.js';
import { getDeals } from '../../api/deals.api.js';
const DealDisplay = props => {
    const dateOfDeparture = document.getElementById('departureDate');
    const dateOfReturn = document.getElementById('returnDate');


  useEffect(() =>{


import React, { useEffect } from "react";
//import axios from "axios";
import { getAirport } from "../../api/airport.api.js";
//import { getDeals } from "../../api/deals.api.js";

const DealDisplay = props => {
  useEffect(() => {
    const getData = async () => {
      const geo = await props.geo;


      const airport = await getAirport({latitude: localStorage.getItem('latitude'), longitude: localStorage.getItem('longitude')})
      console.log(airport)

      //return airport
      
      const iataCode = airport.data.data[0].iataCode
      const deals = await getDeals({iataCode: iataCode, dateOfDeparture: dateOfDeparture.value, dateOfReturn: dateOfReturn.value})
      console.log('res', deals)
      return deals
    }



    getData();
  }, [props.geo]);


  return <div>This is a test</div>;
};

export default DealDisplay;
