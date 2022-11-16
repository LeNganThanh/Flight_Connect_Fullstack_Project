import React, { Fragment, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {debounce} from 'lodash'
import { getAmadeusData } from '../../api/amadeus.api'; 
import classes from './FlightsForm.module.css';


const FlightsForm = (props) => {
 /*  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState(''); */
  const [search, setSearch] = useState(''); 
  
  const [options, setOptions] = useState([]);
  //const [open, setOpen] = false;
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false);
  
const names = options.map(i =>({type: i.subType, name: i.name}));

const debounceLocalData = useCallback(debounce(setKeyword, 1000),[]);

useEffect(() =>{
  debounceLocalData(search);
}, [search]);

   useEffect(() =>{
    setLoading(true)
    const {out, source} = getAmadeusData({...props.search, page:0, keyword })

    out.then(res =>{
      if(!res.data.code){
        console.log("hi")
        console.log(res.data)
        console.log(res.data.data)
        setOptions(res.data.data)
      }
      setLoading(false);
    }).catch(err =>{
      axios.Cancel(err);
      setOptions([]);
      setLoading(false);
    });
    return ()=>{
      source.cancel()
    }
   }, [keyword]);


// testing the api

   const {city, airport} = props.search;

   const label = city && airport ? "City and Airports" : city ? "City" : airport ? "Airports" : ""

  const inputHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    //props.setSearch((p) => ({...p, keyword: 'F', page: 0}))
  }

 
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
            <input onChange={inputHandler} type="text" placeholder="City" />
          </div>
          <div>
            
            <label>To: </label>
            <input onChange={inputHandler} type="text" placeholder="City" />
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
