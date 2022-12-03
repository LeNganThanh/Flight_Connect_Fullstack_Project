import React, { useContext } from "react";
import classes from "./DropDown.module.css";
import { FlightsContext } from "../../context/FlightsContext";

const DropDown = props => {
  const [state, dispatch] = useContext(FlightsContext);
  const passInfo = async e => {
    e.preventDefault();

    const geo = JSON.parse(e.target.value);
    const lat = geo.latitude.toFixed(6);
    const long = geo.longitude.toFixed(6);

    await props.fillInput(e);

    setGeo({
      latitude: lat,
      longitude: long,
    });
  };

  const setGeo = async value => {
    await dispatch({
      type: "setLocation",
      latitude: value.latitude,
      longitude: value.longitude,
    });
  };

  return (
    <div>
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
          : "hi"}
      </div>
    </div>
  );
};

export default DropDown;
