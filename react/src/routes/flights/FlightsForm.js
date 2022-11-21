import React, { Fragment, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { getAmadeusData } from '../../api/amadeus.api';
import DropDown from './DropDown.js';
import classes from './FlightsForm.module.css';
import { getSearchData } from '../../api/search.api';

const FlightsForm = props => {
  /*  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState(''); */
  const [search, setSearch] = useState('');

  const [options, setOptions] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const names = options.map(i => ({ type: i.subType, name: i.name }));

  const debounceLocalData = useCallback(debounce(setKeyword, 1000), []);

  useEffect(() => {
    debounceLocalData(search);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const { out, source } = getAmadeusData({
      ...props.search,
      page: 0,
      keyword,
    });

    out
      .then(res => {
        if (!res.data.code) {
          console.log('hi');
          console.log(res.data);
          console.log(res.data.data);
          setOptions(res.data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        axios.Cancel(err);
        setOptions([]);
        setLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, [keyword]);

  // testing the api

  const { city, airport } = props.search;

  const label =
    city && airport
      ? 'City and Airports'
      : city
      ? 'City'
      : airport
      ? 'Airports'
      : '';

  const inputHandler = e => {
    e.preventDefault();

    console.log(e);
    if (e.target.id === 'from' && e.target.value.length !== 0) {
      setSearch(e.target.value);
      props.setSearch(p => ({ ...p, keyword: `${e.target.value}`, page: 0 }));
      setOpen2(false);
      setOpen1(true);
    } else if (e.target.id === 'to' && e.target.value.length !== 0) {
      setSearch(e.target.value);
      props.setSearch(p => ({ ...p, keyword: `${e.target.value}`, page: 0 }));
      setOpen1(false);
      setOpen2(true);
    } else {
      setOpen1(false);
      setOpen2(false);
    }
  };
  const fillInput = e => {
    const inputFrom = document.getElementById('from');
    const inputTo = document.getElementById('to');
    if (open1) {
      inputFrom.value = e.target.innerText;
      inputFrom.name = e.target.name;
      setOpen1(false);
    } else if (open2) {
      inputTo.value = e.target.innerText;
      inputTo.name = e.target.name;
      setOpen2(false);
    }

    console.log(e);
  };

  const submitHandler = () => {
    const inputFrom = document.getElementById('from');
    const inputTo = document.getElementById('to');
    const dateOfDeparture = document.getElementById('departureDate');

    const out = getSearchData({'originCode': inputFrom.name, 'destinationCode': inputTo.name, 'dateOfDeparture': dateOfDeparture.value})
    out.then(result => {console.log(result);})

  };
  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.radio}>
          <div>
            <input type="radio" value="roundtrip" defaultChecked name="trip" />{' '}
            Roundtrip
          </div>
          <div>
            <input type="radio" value="one way" name="trip" /> One way
          </div>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label>From: </label>
            <input
              id="from"
              onChange={inputHandler}
              type="text"
              placeholder="City / Airport"
            />
            {open1 ? (
              <DropDown fillInput={fillInput} dataSource={props.dataSource} />
            ) : null}
          </div>
          <div>
            <label>To: </label>
            <input
              id="to"
              onChange={inputHandler}
              type="text"
              placeholder="City / Airport"
            />
            {open2 ? (
              <DropDown fillInput={fillInput} dataSource={props.dataSource} />
            ) : null}
          </div>
          <div>
            <label>Departure: </label>
            <input
              id="departureDate"
              className={classes.info}
              type="date"
              placeholder="Departure date"
            />
          </div>
          <div>
            <label>Return: </label>
            <input
              id="returnDate"
              className={classes.info}
              type="date"
              placeholder="Return"
            />
          </div>
          <div>
            <label>Passengers: </label>
            <input
              id="passengers"
              className={classes.info}
              type="number"
              placeholder="Passengers"
            />
          </div>
        </form>
      </div>
      <button onClick={submitHandler} className={classes.submitButton}>
        Search Flights
      </button>
    </Fragment>
  );
};

export default FlightsForm;
