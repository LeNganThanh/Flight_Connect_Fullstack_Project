import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getActivities } from '../../api/activities.api';
const ActivityDisplay = props => {
  const [activity, setActivity] = useState(false)

  useEffect(() =>{
    
    if (!localStorage.getItem('activities')) {
      const getData = async() => {
      
        const geo = await props.geo

        const activities = await getActivities({latitude: geo.latitude, longitude: geo.longitude})

        console.log('act', activities)

        localStorage.setItem('activities', activities.data.data)
        setActivity(activities.data.data)
        return activities
      }

      getData()
    }

  }, [])

  return <div>This is a test</div>;
};

export default ActivityDisplay;
