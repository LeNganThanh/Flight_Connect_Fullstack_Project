import React, { useEffect } from 'react';
import { getDeals } from '../../api/deals.api.js';
import { getAirport } from '../../api/airport.api.js'

const DealDisplay = props => {

  
  const dateOfDeparture = document.getElementById("departureDate");
  const dateOfReturn = document.getElementById("returnDate");


  useEffect(() => {
        const getData = async () => {

          const deals = await getDeals({geoInfo: props.geoInfo, dateOfDeparture: dateOfDeparture.value, dateOfReturn: dateOfReturn.value})

          console.log('res', deals)

          return deals
        }
        getData();
    }, []);


  return <div>This is a test</div>;
};

export default DealDisplay;
