import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';
import { getAmadeusData } from '../../api/amadeus.api';
import DropDown from './DropDown.js';
import classes from './FlightsForm.module.css';
import button from '../../components/Button.module.css';
import Button from '../../components/Button.js';
import { getSearchData } from '../../api/search.api';
import { getActivities } from '../../api/activities.api';
import { FlightsContext } from '../../context/FlightsContext';
//import Button from "../../components/Button";

const FlightsForm = props => {
  /*  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState(''); */
  const [state, dispatch] = useContext(FlightsContext);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [oneWay, setOneWay] = useState(false);
  const [keyword, setKeyword] = useState('');
  // const [loading, setLoading] = useState(false);
  const returnDate = document.getElementById('returnDate');
  const navigate = useNavigate();

  /*   const names = options.map(i => ({ type: i.subType, name: i.name }));
   */
  const debounceLocalData = useCallback(debounce(setKeyword, 1000), []);

  useEffect(() => {
    debounceLocalData(search);
  }, [search]);

  useEffect(() => {
    // setLoading(true);
    const { out, source } = getAmadeusData({
      ...props.search,
      page: 0,
      keyword,
    });

    out
      .then(res => {
        if (!res.data.code) {
          setOptions(res.data.data);
        }
        //setLoading(false);
      })
      .catch(err => {
        console.log(err);
        axios.Cancel(err);
        setOptions([]);
        //   setLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, [keyword]);


  const inputHandler = e => {
    e.preventDefault();
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
  };

  const submitHandler = async () => {
    const inputFrom = document.getElementById('from');
    const inputTo = document.getElementById('to');
    const inputAdult = document.getElementById('adults');
    const inputChildren = document.getElementById('children');
    const dateOfDeparture = document.getElementById('departureDate');
    const dateOfReturn = document.getElementById('returnDate');

    navigate('/flights');

    await getActivities({
      latitude: state.latitude,
      longitude: state.longitude,
    }).then(result => {
      setActivities(result.data);
    });

    await getSearchData({
      originCode: inputFrom.name,
      destinationCode: inputTo.name,
      dateOfDeparture: dateOfDeparture.value,
      dateOfReturn: dateOfReturn.value,
      adults:
        inputAdult.value > 9 ? 9 : inputAdult.value > 0 ? inputAdult.value : 1,
      children:
        inputChildren.value > 9
          ? 9
          : inputChildren.value > 0
          ? inputChildren.value
          : 0,
    }).then(result => {
      setOffers(result.data.data);
    });

  };

  const setOffers = async value => {
    await dispatch({
      type: 'setOffers',
      offers: value,
    });
  };

  const setActivities = async value => {
    await dispatch({
      type: 'setActivities',
      activities: value,
    });
  };

  //setting default date
  function departD() {
    let d = new Date();
    d.setDate(d.getDate() + 7);
    let currDate = d.getDate();
    let currMonth = d.getMonth() + 1;
    let currYear = d.getFullYear();
    return (
      currYear +
      '-' +
      (currMonth < 10 ? '0' + currMonth : currMonth) +
      '-' +
      (currDate < 10 ? '0' + currDate : currDate)
    );
  }
  function returnD() {
    let d = new Date();
    d.setDate(d.getDate() + 15);
    let currDate = d.getDate();
    let currMonth = d.getMonth() + 1;
    let currYear = d.getFullYear();
    return (
      currYear +
      '-' +
      (currMonth < 10 ? '0' + currMonth : currMonth) +
      '-' +
      (currDate < 10 ? '0' + currDate : currDate)
    );
  }

  const inputAdult = document.getElementById('adults');
  const inputChildren = document.getElementById('children');

  const babySitter = e => {
    if (e.target.id === 'adults') {
      if (Number(inputAdult.value) + Number(inputChildren.value) > 9 && inputAdult.value <= 9) {
        inputChildren.value = 9 - Number(inputAdult.value);
      }
      if (inputAdult.value > 9) {
        inputAdult.value = 9
      }
      if (e.target.value <= 0) {
        inputAdult.value = 1
      }
    }
    if (e.target.id === 'children') {
      if (Number(inputChildren.value) + Number(inputAdult.value) > 9 && inputChildren.value < 9) {
        inputAdult.value = 9 - Number(inputChildren.value)
      }
      if (inputChildren.value > 8) {
        inputChildren.value = 8
      }
      if (e.target.value < 0) {
        inputChildren.value = 0
      }
    }
  };

  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.radio}>
          <div>
            <input
              type="radio"
              value="roundtrip"
              defaultChecked
              name="trip"
              onChange={() => {
                setOneWay(false);
                returnDate.value = returnD();
              }}
            />{' '}
            Roundtrip
          </div>
          <div>
            <input
              type="radio"
              value="one way"
              name="trip"
              onChange={() => {
                setOneWay(true);
                returnDate.value = '';
              }}
            />{' '}
            One way
          </div>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label>From: </label>
            <input
              autoComplete="off"
              id="from"
              onChange={inputHandler}
              defaultValue="LONDON"
              name="LON"
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
              autoComplete="off"
              id="to"
              onChange={inputHandler}
              defaultValue="BARCELONA"
              name="BCN"
              type="text"
              placeholder="City / Airport"
            />
            {open2 ? (
              <DropDown id='destination' fillInput={fillInput} dataSource={props.dataSource} />
            ) : null}
          </div>
          <div>
            <label>Departure: </label>
            <input
              id="departureDate"
              defaultValue={departD()}
              className={classes.info}
              type="date"
              placeholder="Departure date"
            />
          </div>
          <div>
            <label>Return: </label>
            <input
              id="returnDate"
              defaultValue={returnD()}
              className={classes.info}
              type="date"
              placeholder="Return"
              disabled={oneWay && 'disabled'}
            />
          </div>
          <div>
            <label>Passengers: </label>
            <div className={classes.passengers}>
              <input
                id="adults"
                defaultValue={1}
                className={classes.passengersInput}
                type="number"
                placeholder="adults"
                onChange={babySitter}
              />
              <input
                id="children"
                defaultValue={0}
                className={classes.passengersInput}
                type="number"
                placeholder="children"
                onChange={babySitter}
              />
            </div>
          </div>
        </form>
      </div>
      <Button onClick={submitHandler} className={button.submitButton}>
        Search Flights
      </Button>
    </Fragment>
  );
};

export default FlightsForm;
