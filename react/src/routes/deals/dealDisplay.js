import React, { useEffect, useState } from "react";
import { getDeals } from "../../api/deals.api.js";
import { getInfo } from "../../api/deals.info.api.js";
import classes from "./Deals.module.css";
import Button from "../../components/Button";
import ScrollTop from "../../components/ScrollTop.js";

const DealDisplay = props => {
  const [topDestinations, setTopDestinations] = useState(false);
  const [deals, setDeals] = useState(false);
  const [dealInfo, setDealInfo] = useState(false);
  const [dealCounter, setDealCounter] = useState(5);

  let cityName = props.geoInfo[0].cityName.toLowerCase().split("");
  cityName[0] = cityName[0].toUpperCase();
  let originCountry = props.geoInfo[0].countryName.toLowerCase().split("");
  originCountry[0] = originCountry[0].toUpperCase();

  const dateOfDeparture = document.getElementById("departureDate");
  const dateOfReturn = document.getElementById("returnDate");

  useEffect(() => {
    if (!deals) {
      const getData = async () => {
        const deals = await getDeals({
          geoInfo: props.geoInfo,
          dateOfDeparture: dateOfDeparture.value,
          dateOfReturn: dateOfReturn.value,
        });
        if (deals.data[0]) {
          
          setTopDestinations(deals.data[0]);
          setDeals(deals.data[1]);
          setDealInfo(deals.data[2]);
        }
      };
      getData();
    }
  }, []);

  const TopDestinations = () => {
    return (
      <div className={classes.topDestinations}>
        <p>Top 10 Destinations from {originCountry}</p>
        {topDestinations.Destinations.map((dest, i) => {
          return (
            <div
              className={classes.rank}
              key={dest.Destination.DestinationLocation}
            >
              <p>
                <span>Rank {dest.Rank} : </span>
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

  const TopDeals = props => {
    let departure = deals.FareInfo[0].DepartureDateTime.split("");
    departure = departure
      .slice(0, departure.indexOf("T"))
      .join("")
      .split("-")
      .join(" ");
    let returnDate = deals.FareInfo[0].ReturnDateTime.split("");
    returnDate = returnDate
      .slice(0, returnDate.indexOf("T"))
      .join("")
      .split("-")
      .join(" ");
    return (
      <div className={classes.topDeals}>
        <div className={classes.topDealsHeader}>
          <p>Top Deals from {cityName} </p>
          <p>
            {" "}
            Departure Date : {departure} | Return Date : {returnDate}
          </p>
        </div>
        {deals.FareInfo.slice(0, dealCounter).map((deal, i) => {
          if (dealInfo[i]) {
            const terms = dealInfo[i][0].terms;
            let countryName = terms[terms.length - 1].value;

            if (countryName === "UK") {
              countryName = "england";
            } else if (countryName.split(" ").length > 1) {
              countryName = countryName
                .split(" ")
                .map(st => st.toLowerCase())
                .join(" ");
            } else {
              countryName = countryName.toLowerCase();
            }

            if (countryName.split(" ").length === 1) {
              return (
                <div key={i} className={classes.dealBox}>
                  <p className={classes.cityInfo}>
                    {dealInfo[i][0].structured_formatting.secondary_text}{" "}
                    <img
                      width={"60px"}
                      height="40px"
                      src={`https://countryflagsapi.com/png/${countryName}`}
                      alt="country flag"
                    ></img>
                  </p>

                  <p className={classes.price}>
                    Price: {deal.LowestFare.Fare} {deal.CurrencyCode}
                  </p>
                </div>
              );
            } else {
              return <div key={i}></div>;
            }
          } else {
            return <div key={i}></div>;
          }
        })}
      </div>
    );
  };

  const moreDeals = () => {
    if (dealInfo.length === dealCounter) {
      getInfo({
        destinations: deals.FareInfo.slice(
          dealCounter,
          Number(dealCounter) + 5
        ).map(fare => fare.DestinationLocation),
      }).then(res => {
        const currInfo = [...dealInfo];
        res.data.map(data => currInfo.push(data));
        setDealInfo(currInfo);
      });
    }
    if (dealCounter <= 45) {
      setDealCounter(dealCounter + 5);
    }
  };
  const lessDeals = () => {
    if (dealCounter >= 10) {
      setDealCounter(dealCounter - 5);
    }
  };

  return (
    <div className={classes.dealsDisplayParent}>
      <div className={classes.dealsDisplay}>
        <div>{dealInfo ? <TopDeals /> : null}</div>
        {topDestinations ? <TopDestinations /> : null}
      </div>
      <div className={classes.buttons}>
        {dealInfo && dealCounter < 50 ? (
          <Button onClick={moreDeals}>more</Button>
        ) : null}
        {dealInfo && dealCounter >= 10 ? (
          <Button onClick={lessDeals}>less</Button>
        ) : null}
      </div>
      {dealInfo && dealCounter > 5 ? <ScrollTop /> : null}
    </div>
  );
};

export default DealDisplay;
