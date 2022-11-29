import axios from 'axios'

export const getActivities = params => {
 const {latitude, longitude} = params;
  const lat = (Number(latitude) + 0.000069).toFixed(6)
  const long = (Number(longitude) + 0.000069).toFixed(6)
  console.log(lat, long)
 
  const out = axios.get(`http://localhost:1338/api/activities/?latitude=${Number(lat)}&longitude=${Number(long)}`)

  return out;
}
