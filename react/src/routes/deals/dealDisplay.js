import React, { useEffect } from 'react';
import { getDeals } from '../../api/deals.api.js';

const DealDisplay = props => {
  const dateOfDeparture = document.getElementById('departureDate');
  const dateOfReturn = document.getElementById('returnDate');

  useEffect(() => {
    const getData = async () => {
      //return airport

      const deals = await getDeals({
        iataCode: localStorage.getItem('iataCode'),
        dateOfDeparture: dateOfDeparture.value,
        dateOfReturn: dateOfReturn.value,
      });
      console.log('res', deals);
      return deals;
    };

    getData();
  }, []);

  return <div>This is a test</div>;
};

export default DealDisplay;
