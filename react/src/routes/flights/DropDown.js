import React, { useContext } from 'react';
import FlightsProvider from '../../context/FlightsContextProvider';
import classes from './DropDown.module.css';

const DropDown = props => {
  const [setCity] = useContext(FlightsProvider)
  const passInfo = e => {
    console.log(JSON.parse(e.target.value));
    e.preventDefault();
    console.log(e.geoCode);

    props.fillInput(e);
    
  };
  return (
    <div>
      <div>
        {props.dataSource
          ? props.dataSource.data.map(city => {
            setCity(city.geoCode)
           
           //console.log(city);
              return (
                <button 
                  value={JSON.stringify(city.geoCode)}
                  onClick= { passInfo }
                  className={classes.list}
                  name={city.iataCode}
                  key= {city.id}
                >
                  {city.name}
                </button>
              );
            })
          : 'hi'}
      </div>
    </div>
  );
};

export default DropDown;
