
import axios from "axios";

export const getInfo = params => {
  const {destinations} = params
  console.log(destinations)
  const out = axios.get(
    `http://localhost:1338/api/deals/info/?dest=${JSON.stringify(destinations)}`
  );

  return out;
};
