import axios from "axios";

const getPrice = props => {
  const out = axios.get(
    `/api/booking/price?offer=${JSON.stringify(props.offer)}`
  );

  return out;
};

const placeOrder = props => {
  const out = axios.post(`/api/booking/order`, {
    order: props.order,
    travelers: props.travelers,
  });

  return out;
};

export { getPrice, placeOrder };
