import axios from "axios";

export const getImages = params => {
  const out = axios.get(`/api/google/images/?`);

  return out;
};
