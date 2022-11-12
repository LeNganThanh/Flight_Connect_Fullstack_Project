import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import classes from './FlightsForm.module.css';

const FlightsForm = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const key = process.env.REACT_APP_KEY;
  const password =
    process.env.REACT_APP_PASSWORD /
    useEffect(() => {
      async function makeRequest() {
        const config = {
          method: 'GET',
          url: 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200',

          headers: {
            type: 'amadeusOAuth2Token',
            username: 'kattanb65@gmail.com',
            application_name: 'Flight connect',
            client_id: '042NS4mjYJwXt2TINasYiZ9XXmnFUYgy',
            token_type: 'Bearer',
            access_token: 'W6bj3GTTfei46OFIxXVkPDOGg3ZZ',
            expires_in: 1799,
            state: 'approved',
            scope: '',
          },
        };

        let res = await axios(config);

        console.log(res.status);
      }

      makeRequest();
    });

  const submitHandler = () => {
    console.log('hi');
  };
  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.radio}>
          <div>
            <input type="radio" value="roundtrip" name="trip" /> Roundtrip
          </div>
          <div>
            <input type="radio" value="one way" name="trip" /> One way
          </div>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label>From: </label>
            <input type="text" placeholder="City" />
          </div>
          <div>
            {' '}
            <label>To: </label>
            <input type="text" placeholder="City" />
          </div>
          <div>
            <label>Departure: </label>
            <input type="date" placeholder="Departure date" />
          </div>
          <div>
            <label>Return: </label>
            <input type="date" placeholder="Return" />
          </div>
          <div>
            {' '}
            <label>Passengers: </label>
            <input type="number" placeholder="Passengers" />
          </div>
        </form>
        <div className={classes.checkBox}>
          <div>
            <input type="checkbox" value="add" name="add" /> Add near by
            Airports
          </div>
          <div>
            <input type="checkbox" value="add" name="add" /> Non- stop flights
            only
          </div>
        </div>
      </div>
      <button className={classes.submitButton}>Search Flights</button>
    </Fragment>
  );
};

export default FlightsForm;
