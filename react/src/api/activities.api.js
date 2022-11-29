import axios from 'axios'


export const getTours = params => {
 const {latitude, longitude, dateOfDeparture, dateOfReturn} = params;
  console.log(latitude, longitude, dateOfDeparture, dateOfReturn)
 
  const out = axios.get(`http://localhost:1338/api/local-airport/?latitude=${latitude}&longitude=${longitude}&dateOfDeparture=${dateOfDeparture}&dateOfReturn=${dateOfReturn}`)

  return out;
}
