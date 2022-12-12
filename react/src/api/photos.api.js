import axios from 'axios'

export const getPhotos = params => {
  const {photoId} = params
 
  const out = axios.get(`http://localhost:1338/api/google/photos/?photoId=${photoId}`)

  return out;
}
