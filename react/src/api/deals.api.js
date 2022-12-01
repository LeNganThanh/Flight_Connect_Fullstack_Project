import axios from 'axios'

export const getDeals = params => {

  const out = axios.get(`http://localhost:1338/api/deals/?iataCode=${params.iataCode}&dateOfDeparture=${params.dateOfDeparture}&dateOfReturn=${params.dateOfReturn}`)

  return out;
}
