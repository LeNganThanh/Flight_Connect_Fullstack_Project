
import axios from 'axios'

export const getDetails = params => {
  console.log(params)
  const {placeIds} = params
 
  const out = axios.get(`http://localhost:1338/api/google/details/?placeIds=${placeIds}`)

  return out;
}
