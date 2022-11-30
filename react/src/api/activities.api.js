import axios from 'axios'


export const getTours = params => {
 const {latitude, longitude}  = params;
 

  const out  = axios.get(`http://localhost:1338/api/shopping/activities/?latitude=${latitude}&longitude=${longitude}`)

  return out;
}