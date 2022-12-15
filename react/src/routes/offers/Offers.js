import React, { Fragment, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FlightsContext } from '../../context/FlightsContext';
import airPlane from '../../media/Airplane-logo.png';
import classes from './Offers.module.css';
import Activities from './Activities';
import Booking from './Booking.js';
import BookmarkIcon from './BookmarkIcon';
import ScrollTop from '../../components/ScrollTop.js';

import { useNavigate } from 'react-router';

const Offers = props => {
  const [state] = useContext(FlightsContext);
  const { offers, activities } = state;

  const navigate = useNavigate();

  useEffect(() => {
    if (!offers && state.latitude === '') {
      navigate('/');
    }
  }, []);

  if (offers && offers !== undefined) {
    return (
      <div className={classes.offers}>
        {activities.length > 0 ? <Activities /> : null}

        <div className={classes.offersHeader}>
          <h2>
            {state.cities[0]} | {state.cities[1]}
          </h2>
        </div>
        {offers.map((offer, iOffer) => {
          return (
            <div key={iOffer} className={classes.mainBox}>
              <BookmarkIcon offer={offer} value={iOffer}/>

              <div className={classes.singleOffer}>
                {offer.itineraries.map((iti, itiIndex) => {
                  const segments = iti.segments;
                  const duration = iti.duration.slice(0, -1);

                  const toggleSegments = e => {
                    e.preventDefault();
                    e.target.parentElement.nextElementSibling.classList.toggle(
                      classes.hidden
                    );
                    e.target.parentElement.nextElementSibling.classList.toggle(
                      classes.segments
                    );
                  };

                  return (
                    <div key={itiIndex}>
                      <div className={classes.itineraries}>
                        <div>
                          <img
                            src={`https://www.skyscanner.net/images/airlines/${segments[0].carrierCode}.png`}
                            alt="airline logo"
                          />
                        </div>

                        <div>
                          <p>{segments[0].departure.at.slice(11, 16)}</p>
                          <p>{segments[0].departure.iataCode}</p>
                        </div>

                        <div className={classes.duration}>
                          <p>
                            {duration.slice(2, duration.split('').indexOf('H'))}
                            h{' '}
                            {duration.slice(5, 7)
                              ? `${duration.slice(5, 7)}m`
                              : ''}
                          </p>

                          <div className={classes.timeBox}>
                            <div className={classes.timeLine}>
                              {segments.map((stop, index) => {
                                return (
                                  <Fragment key={index}>
                                    {index > 0 ? (
                                      <div className={classes.redDot}></div>
                                    ) : null}
                                  </Fragment>
                                );
                              })}
                            </div>

                            <div className={classes.plane}>
                              <img src={airPlane} alt="plane" />
                            </div>
                          </div>

                          {segments.length === 1 ? (
                            <p style={{ color: 'green' }}>Non-stop</p>
                          ) : segments.length === 2 ? (
                            <p style={{ color: 'blue' }}>
                              1 stop <span>{segments[0].arrival.iataCode}</span>
                            </p>
                          ) : (
                            <p style={{ color: 'red' }}>
                              {segments.length - 1} stops
                              {segments.map((stop, stopIndex) => {
                                if (stopIndex !== 0) {
                                  return (
                                    <span key={stopIndex}>
                                      <span> {stop.departure.iataCode} </span>
                                    </span>
                                  );
                                } else {
                                  return <span key={stopIndex}></span>;
                                }
                              })}
                            </p>
                          )}
                        </div>

                        <div>
                          <p>
                            {segments[segments.length - 1].arrival.at.slice(
                              11,
                              16
                            )}
                          </p>
                          <p>
                            {segments[segments.length - 1].arrival.iataCode}
                          </p>
                        </div>
                        <FontAwesomeIcon
                          onClick={toggleSegments}
                          className={classes.toggleButton}
                          icon={faAngleDown}
                        />
                      </div>
                      <div className={classes.hidden}>
                        {segments.map((segment, i) => {
                          return (
                            <div key={i} className={classes.singleSegment}>
                              <div>Flight {i + 1}</div>
                              <div>
                                <p>{segment.departure.at.slice(11, 16)}</p>
                                <p>{segment.departure.iataCode}</p>
                              </div>
                              |
                              <div>
                                <p>{segment.arrival.at.slice(11, 16)}</p>
                                <p>{segment.arrival.iataCode}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={classes.price} key={offer.id}>
                <h2> {offer.price.total}€</h2>

                <Booking value={offer} />
              </div>
            </div>
          );
        })}
        <ScrollTop />
      </div>
    );
  } else if (!offers && state.latitude !== '') {
    return (
      <div>
        <h2>Loading Results</h2>
      </div>
    );
  } else if (offers.length === 0) {
    return (
      <div>
        <h2>No results for this route</h2>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Offers;
