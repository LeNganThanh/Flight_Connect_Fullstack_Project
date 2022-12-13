import React from 'react';
import classes from './BookedFlight.module.css';

export default function BookedFlight({ bookedFlight }) {
  console.log(bookedFlight);
  const flight = bookedFlight.flightOffers[0];
  const departure = flight.itineraries[0].segments[0].departure.at.split('');
  const countryCallingNumber =
    bookedFlight.travelers[0].contact.phones[0].countryCallingCode;
  const phoneNumber = bookedFlight.travelers[0].contact.phones[0].number;
  const concat = '+' + countryCallingNumber + ' ' + phoneNumber;
  console.log(concat);
  console.log(departure);

  const arrival = flight.itineraries[0].segments.at(-1).arrival.at.split('');

  const carrierCode = flight.itineraries[0].segments[0].carrierCode;

  return (
    <div>
      {bookedFlight ? (
        <div className={classes.main}>
          <div className={classes.infoContainer}>
            <div className={classes.ticketInfo}>
              <h2> Your Ticket Information</h2>
              <h3>Order Id:</h3>
              <p>#{bookedFlight.id}</p>
              <h3>Price:</h3>
              <p>
                {flight.price.total}
                {flight.price.currency}
              </p>
              <h3>Flight Date:</h3>
              <p>{departure.slice(0, departure.indexOf('T')).join('')}</p>
              <h3>Arrival Date:</h3>
              <p>{arrival.slice(0, arrival.indexOf('T')).join('')}</p>
              <div>
                <img
                  src={`https://www.skyscanner.net/images/airlines/${carrierCode}.png`}
                  alt="airline logo"
                />
              </div>
            </div>
            <div className={classes.personalInfo}>
              <h2>Your Personal Information</h2>
              <h3>First Name:</h3>
              <p>{bookedFlight.travelers[0].name.firstName}</p>
              <h3>Last Name:</h3>
              <p>{bookedFlight.travelers[0].name.lastName}</p>
              <h3>Date Of Birth:</h3>
              <p>{bookedFlight.travelers[0].dateOfBirth}</p>
              <h3>Gender:</h3>
              <p>{bookedFlight.travelers[0].gender}</p>
              <h3>Nationality:</h3>
              <p>{bookedFlight.travelers[0].documents[0].nationality}</p>{' '}
            </div>
          </div>
          <div className={classes.contact}>
            <h2>Contact:</h2>
            <h3>Email:</h3>
            <p>{bookedFlight.travelers[0].contact.emailAddress}</p>{' '}
            <h3>Phone Number</h3>
            <p>{concat}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
