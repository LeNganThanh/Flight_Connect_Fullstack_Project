//import React, { useContext } from 'react';
//import { FlightsContext } from '../../context/FlightsContext';
import classes from './DropDown.module.css';

const DropDown = props => {
  //const [setCity ]= useContext(FlightsContext)
  const passInfo = e => {
    console.log(JSON.parse(e.target.value));
    e.preventDefault();
  
    props.fillInput(e);
    
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
