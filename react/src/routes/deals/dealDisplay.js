
import React, { useEffect } from 'react';
import { getAirport } from '../../api/airport.api.js';
import { getDeals } from '../../api/deals.api.js';

const DealDisplay = props => {
  useEffect(() => {
    const getData = async () => {

      const airport = await getAirport({latitude: localStorage.getItem('latitude'), longitude: localStorage.getItem('longitude')})
      
      const airports = airport.data.data.slice(0, 5);

      let airportCodes = [];

      airports.map(port => {
        airportCodes.push({
          iataCode: port.iataCode,
          cityName: port.address.cityName,
          countryCode: port.address.countryCode,
          countryName: port.address.countryName
        })
      })
      console.log(airportCodes)

      const deals = await getDeals({iataCode: iataCode, dateOfDeparture: dateOfDeparture.value, dateOfReturn: dateOfReturn.value})

      console.log('res', deals)

      return deals
    }

    getData();
  }, []);


  return <div>This is a test</div>;
};

export default DealDisplay;
