import axios from "axios";

export const getInfo = params => {
  const { destinations } = params;
  const out = axios.get(
    `/api/deals/info/?dest=${JSON.stringify(destinations)}`
  );

  return out;
};
