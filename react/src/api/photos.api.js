import axios from "axios";

export const getPhotos = params => {
  const { photoId } = params;

  const out = axios.get(`/api/google/photos/?photoId=${photoId}`);

  return out;
};
