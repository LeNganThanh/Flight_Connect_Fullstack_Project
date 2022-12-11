import React, { useContext } from "react";
import classes from "./DropDown.module.css";
import { FlightsContext } from "../../context/FlightsContext";

const DropDown = props => {
  const [state, dispatch] = useContext(FlightsContext);

  const passInfo = e => {
    e.preventDefault();

    const geo = JSON.parse(e.target.value);
    const lat = geo.latitude.toFixed(6);
    const long = geo.longitude.toFixed(6);

    props.fillInput(e);

    if (props.id === 'destination') {
      dispatch({
        type: "setLocation",
        latitude: lat,
        longitude: long,
      });
    }
  };

  return (
    <div>
        {props.dataSource
          ? props.dataSource.data.map(city => {
              //console.log(city);
              return (
                <button
                  value={JSON.stringify(city.geoCode)}
                  onClick={passInfo}
                  className={classes.list}
                  name={city.iataCode}
                  key={city.id}
                >
                  {city.name}
                </button>
              );
            })
          : null}
    </div>
  );
};

export default DropDown;
