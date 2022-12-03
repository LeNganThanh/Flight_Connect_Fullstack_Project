import axios from "axios";

export const getDeals = params => {
  const out = axios.get(
    `http://localhost:1338/api/deals/?geoInfo=${JSON.stringify(
      params.geoInfo
    )}&dateOfDeparture=${params.dateOfDeparture}&dateOfReturn=${
      params.dateOfReturn
    }`
  );

  return out;
};
