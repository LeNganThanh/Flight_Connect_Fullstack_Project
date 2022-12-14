import axios from "axios";

export const getActivities = params => {
  const { latitude, longitude } = params;

  const out = axios.get(
    `/api/activities/?latitude=${latitude}&longitude=${longitude}`
  );

  return out;
};
