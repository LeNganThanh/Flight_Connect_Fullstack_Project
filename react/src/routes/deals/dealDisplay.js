import React, { useEffect, useState } from "react";
import { getDeals } from "../../api/deals.api.js";
import { getInfo } from '../../api/deals.info.api.js'
import classes from './Deals.module.css'

const DealDisplay = props => {
  const [topDestinations, setTopDestinations] = useState(false)
  const [deals, setDeals] = useState(false)
  const [dealInfo, setDealInfo] = useState(false)
  const geoInfo = props.geoInfo

  const dateOfDeparture = document.getElementById("departureDate");
  const dateOfReturn = document.getElementById("returnDate");

  useEffect(() => {
    if (!localStorage.getItem("deals")) {
      const getData = async () => {
        const deals = await getDeals({
          geoInfo: props.geoInfo,
          dateOfDeparture: dateOfDeparture.value,
          dateOfReturn: dateOfReturn.value,
        });
        console.log('deals', deals)
        if (deals.data[0]) {
          console.log('if deals', deals.data)
          localStorage.setItem('deals', JSON.stringify(deals.data))
          setTopDestinations(deals.data[0])
          setDeals(deals.data[1])
          setDealInfo(deals.data[2])
        } 
      };
      getData();
    } else if (localStorage.getItem("deals") && !deals) {
      const localDeals = JSON.parse(localStorage.getItem("deals"))
      setTopDestinations(localDeals[0])
      setDeals(localDeals[1])
      setDealInfo(localDeals[2])
    }
  }, []);

  const TopDestinations = () => {
    return (
      <div>
        <p>Top 15 Destinations from {props.geoInfo[0].countryName}</p>
        {topDestinations.Destinations.map((dest, i) => {
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

  const [dealCounter, setDealCounter] = useState(10)

  const TopDeals = (props) => {
    const range = props.range

    return (
      <div>
        {deals.FareInfo.slice(range, Number(range) + 10).map((deal, i) => {
          if(dealInfo[i] && dealCounter > range) {
            const terms = dealInfo[i][0].terms
            let countryName = terms[terms.length - 1].value
            
            if(countryName === 'UK'){
              countryName = 'england'
            } else if(countryName.split(' ').length > 1) {
              countryName = countryName.split(' ').map(st => st.toLowerCase()).join(' ')
            } else {
              countryName = countryName.toLowerCase()
            }
            console.log(countryName)

            if(countryName.split(' ').length === 1) {
              return (
                <div key={i}>
                {countryName ? <img width={'70px'} height='40px' src={`https://countryflagsapi.com/png/${countryName}`} alt='country flag'></img> : null}
                  <p>
                    Price: {deal.LowestFare.Fare} {deal.CurrencyCode}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={i}></div>
              )
            }
          }
        })}
      </div>
    );
  };


  const moreDeals = () => {
    if (dealInfo.length === dealCounter) {
      getInfo({
        destinations: deals.FareInfo.slice(dealCounter, Number(dealCounter) + 10).map(fare => fare.DestinationLocation)
      }).then(res => {
        console.log(res)
        const currInfo = [...dealInfo]
        res.data.map(data => currInfo.push(data))
        setDealInfo(currInfo)
      })
    }
    if(dealCounter <= 40) {
      setDealCounter(dealCounter + 10)
    }
  }
  const lessDeals = () => {
    if(dealCounter >= 20) {
      setDealCounter(dealCounter - 10)
    }
  }

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth',
      });
  };

  return (
    <div>

    <div className={classes.dealsDisplay}>
      {topDestinations ? <TopDestinations /> : null}
      <div>
        <p>Top Deals from {geoInfo[0].cityName}</p>
        {dealInfo[9] ? <TopDeals range={0} /> : null}
        {dealInfo[19] ? <TopDeals range={10} /> : null}
        {dealInfo[29] ? <TopDeals range={20} /> : null}
        {dealInfo[39] ? <TopDeals range={30} /> : null}
        {dealInfo[49] ? <TopDeals range={40} /> : null}
      </div>
    </div>
    <div>
    {dealInfo && dealCounter < 50 ? <button onClick={moreDeals}>more</button> : null}
    {dealInfo && dealCounter >= 20 ? <button onClick={lessDeals} >less</button> : null}
    </div>
    {dealInfo ? <button onClick={goToTop}>UP</button> : null}
    </div>
  );
};

export default DealDisplay;
