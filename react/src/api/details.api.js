import axios from "axios";

export const getDetails = params => {
  const { placeIds } = params;

  const out = axios.get(`/api/google/details/?placeIds=${placeIds}`);

  return out;
};
