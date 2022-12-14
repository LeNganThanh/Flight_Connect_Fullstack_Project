import axios from "axios";

export const getDeals = params => {
  const out = axios.get(
    `/api/deals/offers?geoInfo=${JSON.stringify(
      params.geoInfo
    )}&dateOfDeparture=${params.dateOfDeparture}&dateOfReturn=${
      params.dateOfReturn
    }`
  );

  return out;
};
