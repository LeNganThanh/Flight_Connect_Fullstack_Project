

import React, { useEffect, useState, useContext } from "react";
import { FlightsContext } from "../../context/FlightsContext";
//import axios from "axios";
import { getActivities } from "../../api/activities.api";

import Activities from "./Activities";


const ActivityDisplay = props => {
  const [city] = useContext(FlightsContext)
  console.log(city);
  //state for activities
  const [activ, setActiv] = useState([]);

  useEffect(() => {
  if (!localStorage.getItem('activities')) {
    const getData = async () => {
      

      const activities = await getActivities({
        latitude:  localStorage.getItem('latitude'),
        longitude: localStorage.getItem('longitude'),
      });

      const activArr = activities.data.data.splice(14, 8);
      localStorage.setItem('activities', activArr)
      setActiv(activArr);

      return activities;
    };
    getData();
  }

  }, [props.geo]);




  return <div>{activ ? <Activities activ={activ} /> : null}</div>;
};

export default ActivityDisplay;