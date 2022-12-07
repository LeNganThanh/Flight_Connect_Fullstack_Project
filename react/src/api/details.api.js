
import axios from 'axios'

export const getDetails = params => {
  const {placeId} = params
 
  const out = axios.get(`http://localhost:1338/api/google/details/?placeId=${placeId}`)

  return out;
}
