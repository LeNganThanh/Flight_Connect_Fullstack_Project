import React, { useEffect, useState } from 'react'
import getPrice from '../../api/booking.price.api.js'
import classes from './Booking.module.css'
import BookingForm from './BookingForm.js'

const Booking = (props) => {

  const [pricing, setPricing] = useState(false)
  const [toggle, setToggle] = useState(false)


  const bookFlight = () => {
    const scrollY = window.scrollY
    getPrice({
      offer: props.value
    }).then(res => {
      setPricing(res.data)
      setToggle(true)
    })
  }


  return (
    <div>
      {toggle ? <BookingForm setToggle={setToggle} /> : null}
      <button onClick={bookFlight}>Book Flight</button>
    </div>
  )
}

export default Booking
