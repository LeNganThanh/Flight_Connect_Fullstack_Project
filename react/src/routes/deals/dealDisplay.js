import React, { useContext, useEffect } from "react";
import { getDeals } from "../../api/deals.api.js";
import { FlightsContext } from "../../context/FlightsContext";
import classes from './Deals.module.css'

const DealDisplay = props => {
  const [state, dispatch] = useContext(FlightsContext);
  const { deals } = state;

  const dateOfDeparture = document.getElementById("departureDate");
  const dateOfReturn = document.getElementById("returnDate");

  useEffect(() => {
    if (!localStorage.getItem("deals") && !deals) {
      const getData = async () => {
        const deals = await getDeals({
          geoInfo: props.geoInfo,
          dateOfDeparture: dateOfDeparture.value,
          dateOfReturn: dateOfReturn.value,
        });
        console.log('deals', deals)
        if (deals.data[0]) {
          console.log('if deals', deals.data)
          localStorage.setItem("deals", JSON.stringify([deals.data[0], deals.data[1], deals.data[2], deals.data[3]]));
          setDeals([deals.data[0], deals.data[1], deals.data[2], deals.data[3]]);
        } 
      };
      getData();
    } else if (localStorage.getItem("deals") && !deals) {
      setDeals(JSON.parse(localStorage.getItem("deals")));
    }
  });

  const setDeals = async value => {
    await dispatch({
      type: "setDeals",
      deals: value,
    });
  };

  const TopDestinations = () => {
    return (
      <div>
        <p>Top 15 Destinations from {props.geoInfo[0].countryName}</p>
        {deals[0].Destinations.slice(0, 15).map((dest, i) => {
          // AirportName: "Lisboa"
          // CityName: "Lisbon"
          // CountryCode: "PT"
          // CountryName: "Portugal"
          // DestinationLocation: "LIS"
          // RegionName: "Europe"
          // Type: "Airport"
          return (
            <div key={dest.Destination.DestinationLocation}>
              <p>
                Rank {dest.Rank}:{" "}
                {dest.Destination.CityName ||
                  dest.Destination.MetropolitanAreaName}{" "}
                | {dest.Destination.CountryName}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const TopDeals = () => {
    return (
      <div>
        <p>Top Deals from {props.geoInfo[0].cityName}</p>
        {deals[1].FareInfo.slice(0, 20).map((deal, i) => {
          return (
            <div key={i}>
              <p>
                Price: {deal.LowestFare.Fare} {deal.CurrencyCode}
              </p>
            </div>
          );
        })}
      </div>
    );
  };


  return (
    <div className= {classes.dealsDisplay}>
      {deals ? <TopDestinations /> : null}
      {deals ? <TopDeals /> : null}
    </div>
  );
};

export default DealDisplay;
