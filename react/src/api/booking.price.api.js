import axios from 'axios'

const getPrice = (props) => {

  console.log(props)
  const out = axios.get(`http://localhost:1338/api/booking/price?offer=${JSON.stringify(props.offer)}`)

  return out
}

const placeOrder = (props) => {
  console.log(props.order, props.travelers)
  const out = axios.post(`http://localhost:1338/api/booking/order`, {
    order: props.order,
    travelers: props.travelers
  })
  
  return out
}

export {getPrice, placeOrder}
