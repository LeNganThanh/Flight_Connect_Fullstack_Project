import React, { useContext, useEffect } from 'react';
import { FlightsContext } from '../../context/FlightsContext';
import classes from './Offers.module.css';

const Offers = () => {
  const [offers] = useContext(FlightsContext);

  const inputFrom = document.getElementById('from');
  const inputTo = document.getElementById('to');

  useEffect(() => {
    console.log(offers);
  }, [offers]);

  if (offers && offers.data.data.length > 0) {
    return (
      <div className={classes.offers}>
        <div className={classes.offersHeader}>
          <h2>{inputFrom.value}</h2>
          <hr></hr>
          <h2>{inputTo.value}</h2>
        </div>
        {offers.data.data.map(offer => {
          const airlineCode = offer.validatingAirlineCodes;
         
          return (
            <div className={classes.singleOffer} >
              {offer.itineraries.map((iti, index) => {
                return (
                  <div key={index} className={classes.itineraries}>
                    <div>
                      <img
                        src={`https://www.skyscanner.net/images/airlines/${airlineCode[index]}.png`}
                        alt="airline logo"
                      />
                    </div>
                    <div>
                      <p>{iti.segments[0].departure.at.slice(11, 16)}</p>
                      <p>{iti.segments[0].departure.iataCode}</p>
                    </div>
                    <div>
                      <p>{iti.duration.slice(2)}</p>
                    </div>
                    <div>
                      <p>{iti.segments[iti.segments.length -1].arrival.at.slice(11, 16)}</p>
                      <p>{iti.segments[iti.segments.length -1].arrival.iataCode}</p>
                    </div>
                  </div>
                );
              })}

              {/* <div key={offer.id}>
                <h2>Total Price: {offer.price.total}€</h2>
              </div> */}
            </div>
          );
        })}
      </div>
    );
  } else if (offers && offers.data.data.length === 0) {
    return (
      <div>
        <h2>No results for this route</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Loading takes a life time!</h2>
      </div>
    );
  }
};

export default Offers;

