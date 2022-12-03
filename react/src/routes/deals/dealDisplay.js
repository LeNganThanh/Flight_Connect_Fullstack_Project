import React, { useEffect, useState } from 'react';
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
        localStorage.setItem('deals', JSON.stringify(deals))
        setDeals(deals)
      }
      getData();
    } else if (localStorage.getItem('deals') && !deals) {
      setDeals(JSON.parse(localStorage.getItem('deals')))
    }
  }, []);

  const TopDestinations = () => {

    return (
      <div>
        {
          deals[0].slice(0, 15).map((dest, i) => {
            // AirportName: "Lisboa"
            // CityName: "Lisbon"
            // CountryCode: "PT"
            // CountryName: "Portugal"
            // DestinationLocation: "LIS"
            // RegionName: "Europe"
            // Type: "Airport"
            <div key={dest.DestinationLocation}>
              <p>{dest.CityName} - {dest.CountryName}</p>
            </div>
          })
        }
      </div>
    )
  }

  return <div>
           <TopDestinations />
         </div>;
};

export default DealDisplay;
