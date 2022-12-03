
import React, { useContext } from "react";
//import axios from "axios";
import Activities from "./Activities";
import {FlightsContext} from '../../context/FlightsContext.js'


const ActivityDisplay = props => {
  const [state] = useContext(FlightsContext)
  const  {activities}  = state
  

  return <div>{activities !== {} && activities !== undefined ? <Activities activities= {activities}/> : null}</div>;
};

export default ActivityDisplay;
