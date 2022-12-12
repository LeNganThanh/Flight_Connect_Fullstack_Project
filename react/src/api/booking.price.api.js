import axios from 'axios'

const getPrice = (props) => {

  console.log(props)
  const out = axios.get(`http://localhost:1338/api/booking/price?offer=${JSON.stringify(props.offer)}`)

  return out
}

export default getPrice
