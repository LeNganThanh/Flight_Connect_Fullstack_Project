import axios from 'axios'

export const getImages = params => {
 
  const out = axios.get(`http://localhost:1338/api/google/images/?`)

  return out;
}
