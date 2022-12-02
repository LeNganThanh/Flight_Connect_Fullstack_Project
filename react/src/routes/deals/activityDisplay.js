
import React, { useEffect, useState, useContext } from "react";



//import axios from "axios";
import { getActivities } from "../../api/activities.api";
import Activities from "./Activities";
import {FlightsContext} from '../../context/FlightsContext.js'


const ActivityDisplay = props => {
  const [city] = useContext(FlightsContext)
  console.log(city);
  //state for activities
  const [activ, setActiv] = useState(false);
  const [state] = useContext(FlightsContext)

  useEffect(() => {

    const getData = async () => {

      if (state.longitude !== '') {
        const activities = await getActivities({
          latitude: state.latitude,
          longitude: state.longitude,
        });

        const activArr = activities.data.data.splice(14, 8);
        console.log('activities', activArr)



        setActiv(activArr);

        return activities;
      }
    };
    getData();

  }, [state]);




  return <div>{activ ? <Activities activ={activ} /> : null}</div>;
};

export default ActivityDisplay;
