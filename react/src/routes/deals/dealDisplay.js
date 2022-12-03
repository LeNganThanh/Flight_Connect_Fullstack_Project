import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { getDeals } from '../../api/deals.api.js';
import {FlightsContext} from '../../context/FlightsContext'

const DealDisplay = props => {
  const [state, dispatch] = useContext(FlightsContext)
  const {deals} = state

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
      console.log('localDeals', deals)
      setDeals(JSON.parse(localStorage.getItem('deals')))
    } else if (deals.data) {
      console.log('last', deals.data)
    }

  });

  const setDeals = async(value) => {
    await dispatch({
      type: 'setDeals',
      deals: value
    });
  }

  const TopDestinations = () => {
    console.log('destinations', deals.data[0].Destinations.slice(0, 15))
      return (
        <div>
          <p>Top 15 Destinations from {props.geoInfo[0].countryName}</p>
          {
            deals.data[0].Destinations.slice(0, 15).map((dest, i) => {
              // AirportName: "Lisboa"
              // CityName: "Lisbon"
              // CountryCode: "PT"
              // CountryName: "Portugal"
              // DestinationLocation: "LIS"
              // RegionName: "Europe"
              // Type: "Airport"
              return (
                <div key={dest.Destination.DestinationLocation}>
                  <p>Rank {dest.Rank}:  {dest.Destination.CityName || dest.Destination.MetropolitanAreaName}  |  {dest.Destination.CountryName}</p>
                </div>
              )
            })
          }
        </div>
      )
  }

  const TopDeals = () => {
    console.log('deals')
    return (
      <div>
        <p>Top Deals from {props.geoInfo[0].cityName}</p>
        {
          deals.data[1].FareInfo.slice(0, 20).map((deal, i) => {
            return (
              <div>
                <p>Price: {deal.LowestFare.Fare} {deal.CurrencyCode}</p>
              </div>
            )
          })
        }
      </div>
    )
  }

  return <div style={{display: 'flex', justifyContent:'space-between', width:'100%'}}>
            { deals ? <TopDestinations /> : null }
            { deals ? <TopDeals /> : null }
         </div>;
};

export default DealDisplay;
