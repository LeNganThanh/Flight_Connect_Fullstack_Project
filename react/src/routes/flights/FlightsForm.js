import React, { Fragment } from 'react';
import classes from './FlightsForm.module.css';

const FlightsForm = () => {
  
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
