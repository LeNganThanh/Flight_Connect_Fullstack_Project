import React, { useEffect } from 'react';
import axios from 'axios';
import { getActivities } from '../../api/activities.api';
const ActivityDisplay = props => {

  useEffect(() =>{

    const getData = async() => {
    
      const geo = await props.geo

      const activities = await getActivities({latitude: geo.latitude, longitude: geo.longitude})

      console.log('act', activities)

      return activities
    }

    getData()

  }, [])

  return <div>This is a test</div>;
};

export default ActivityDisplay;
