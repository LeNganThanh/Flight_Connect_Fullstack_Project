import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getDeals } from '../../api/deals.api.js';
import Deals from './Deals.js';

const DealDisplay = props => {

  const [deals, setDeals] = useState(false)
  const dateOfDeparture = document.getElementById("departureDate");
  const dateOfReturn = document.getElementById("returnDate");

  useEffect(() => {
    if (!localStorage.getItem('deals') && !deals) {
      const getData = async () => {
        console.log('dealDisplay check')
        const deals = await getDeals({geoInfo: props.geoInfo, dateOfDeparture: dateOfDeparture.value, dateOfReturn: dateOfReturn.value})

        console.log('res', deals)
        setDeals(deals)
        localStorage.setItem('deals', JSON.stringify(deals))
      }
      getData();
    } else if (localStorage.getItem('deals') && !deals) {
      console.log('localDeals')
      setDeals(JSON.parse(localStorage.getItem('deals')))
    } else if (deals.data) {
      console.log('last', deals)
    }

  });

  const TopDestinations = () => {

    return (
      <div>{
              deals.data[0].Destinations.slice(0, 15).map((dest, i) => {
                // AirportName: "Lisboa"
                // CityName: "Lisbon"
                // CountryCode: "PT"
                // CountryName: "Portugal"
                // DestinationLocation: "LIS"
                // RegionName: "Europe"
                // Type: "Airport"
                <div key={dest.Destination.DestinationLocation}>
                  <p>{dest.Destination.CityName} - {dest.Destination.CountryName}</p>
                </div>
              })
            }
      </div>
    )
  }

  return <div>
            { deals ? <TopDestinations deals={deals} /> : null }
         </div>;
};

export default DealDisplay;
