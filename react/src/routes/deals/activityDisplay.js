
import React, { useEffect, useState } from "react";
//import axios from "axios";
import { getActivities } from "../../api/activities.api";

import Activities from "./Activities";


const ActivityDisplay = props => {
  //state for activities
  const [activ, setActiv] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const geo = await props.geo;

      const activities = await getActivities({
        latitude: geo.latitude,
        longitude: geo.longitude,
      });

      const activArr = activities.data.data.splice(14, 8);

      setActiv(activArr);

      return activities;
    };


    getData();
  }, [props.geo]);



  return <div>{activ ? <Activities activ={activ} /> : null}</div>;
};

export default ActivityDisplay;
