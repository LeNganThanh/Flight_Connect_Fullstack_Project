import axios from 'axios'

export const getDeals = params => {
  console.log("params", params)

  const out = axios.get(`http://localhost:1338/api/deals/?iataCode=${params}`)

  return out;
}
