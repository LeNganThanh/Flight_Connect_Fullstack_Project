import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { getAmadeusData } from "../../api/amadeus.api";
import DropDown from "./DropDown.js";
import classes from "./FlightsForm.module.css";
import button from '../../components/Button.module.css'
import Button from '../../components/Button.js'
import { getSearchData } from "../../api/search.api";
import { getActivities } from "../../api/activities.api";
import { FlightsContext } from "../../context/FlightsContext";
//import Button from "../../components/Button";

const FlightsForm = props => {
  /*  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState(''); */
  const [state, dispatch] = useContext(FlightsContext);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [oneWay, setOneWay] = useState(false);
  const [keyword, setKeyword] = useState("");
  // const [loading, setLoading] = useState(false);

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

  // testing the api
  /*  
  const { city, airport } = props.search;

 const label =
    city && airport
      ? "City and Airports"
      : city
      ? "City"
      : airport
      ? "Airports"
      : "";
 */
  const inputHandler = e => {
    e.preventDefault();

    if (e.target.id === "from" && e.target.value.length !== 0) {
      setSearch(e.target.value);
      props.setSearch(p => ({ ...p, keyword: `${e.target.value}`, page: 0 }));
      setOpen2(false);
      setOpen1(true);
    } else if (e.target.id === "to" && e.target.value.length !== 0) {
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
    const inputFrom = document.getElementById("from");
    const inputTo = document.getElementById("to");
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
    const inputFrom = document.getElementById("from");
    const inputTo = document.getElementById("to");
    const dateOfDeparture = document.getElementById("departureDate");
    const dateOfReturn = document.getElementById("returnDate");

    navigate("/flights");
    await getSearchData({
      originCode: inputFrom.name,
      destinationCode: inputTo.name,
      dateOfDeparture: dateOfDeparture.value,
      dateOfReturn: dateOfReturn.value,
    }).then(result => {
      setOffers(result.data.data);
    });

    await getActivities({
      latitude: state.latitude,
      longitude: state.longitude,
    }).then(result => {
      console.log(result.data)
      setActivities(result.data);
    });
  };


  const setOffers = async value => {
    await dispatch({
      type: "setOffers",
      offers: value,
    });
  };

  const setActivities = async value => {
    await dispatch({
      type: "setActivities",
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
      "-" +
      (currMonth < 10 ? "0" + currMonth : currMonth) +
      "-" +
      (currDate < 10 ? "0" + currDate : currDate)
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
      "-" +
      (currMonth < 10 ? "0" + currMonth : currMonth) +
      "-" +
      (currDate < 10 ? "0" + currDate : currDate)
    );
  }

  const returnDate = document.getElementById("returnDate");

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
            />{" "}
            Roundtrip
          </div>
          <div>
            <input
              type="radio"
              value="one way"
              name="trip"
              onChange={() => {
                setOneWay(true);
                returnDate.value = "";
              }}
            />{" "}
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
              defaultValue="MELBOURNE"
              name="MEL"
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
              disabled={oneWay && "disabled"}
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
      <Button onClick={submitHandler} className={button.submitButton}>
        Search Flights
      </Button>
    </Fragment>
  );
};

export default FlightsForm;
