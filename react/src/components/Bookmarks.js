import React, { Fragment, useContext, useEffect} from "react";
import { FlightsContext } from "../context/FlightsContext";
import classes from "../routes/offers/Offers.module.css";
import airPlane from "../media/Airplane-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Booking from "../routes/offers/Booking.js";
import ScrollTop from "./ScrollTop.js";
import { useNavigate } from "react-router-dom";


const Bookmarks = () => {
  const [state, dispatch] = useContext(FlightsContext);
  
  const navigate = useNavigate()
  const user = state.user;

  useEffect(() => {
    if ( !user ) {
      navigate('/');
    }
  }, [user]);


  const deleteBookmark = e => {
    e.preventDefault();
    const id = e.target.value;
    fetch(`/flights/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          dispatch({
            type: "setUser",
            user: result.data,
          });

          
          const check = state.bookmarks.map(mark => {
            if (mark.includes(id)) {
              return true
            } else {
              return false
            }
          }) 
          if (check.includes(true)){
            dispatch({
              type: 'deleteBookmark',
              bookmark: check.indexOf(true)
            })

          }
        }
      });
  };


  if (user && user.flights.length > 0) {
    const bookmarks = user.flights.map(flight => {
      return [flight.flight, flight._id];
    });
    return (
      <div className={classes.offers}>
        {bookmarks.map((flight, iFlight) => {
          const flight_data = JSON.parse(flight[0]);
          const flight_id = flight[1];
          return (
            <div key={iFlight} className={classes.mainBox}>
              <div className={classes.singleOffer}>
                {flight_data.itineraries.map((iti, itiIndex) => {
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
                            {duration.slice(2, duration.split("").indexOf("H"))}
                            h{" "}
                            {duration.slice(5, 7)
                              ? `${duration.slice(5, 7)}m`
                              : ""}
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
                            <p style={{ color: "green" }}>Non-stop</p>
                          ) : segments.length === 2 ? (
                            <p style={{ color: "blue" }}>
                              1 stop <span>{segments[0].arrival.iataCode}</span>
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>
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
              <div className={classes.price} key={flight_data.id}>
                <h2> {flight_data.price.total}€</h2>
                <Booking value={JSON.parse(flight[0])} />
                <button value={flight_id} onClick={deleteBookmark}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {user.flights.length > 2 ? <ScrollTop /> : null}
      </div>
    );
  } else {
    return <div className={classes.noBookmarks}>No bookmarks</div>;
  }
};

export default Bookmarks;
