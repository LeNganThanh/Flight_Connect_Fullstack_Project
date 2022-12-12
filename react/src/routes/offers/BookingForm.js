import React, { useEffect, useLayoutEffect, useState } from 'react'
import classes from './Booking.module.css'




  const BookingForm = (props) => {

    const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();

        return false;
    }

    useLayoutEffect(() => {
      document.getElementById('root').addEventListener('wheel', preventScroll, {passive: false});
    })

    const activateScroll = () => {
      document.getElementById('root').removeEventListener('wheel', preventScroll, false)
    }

    const toggleForm = () => {
      activateScroll()
      props.setToggle(false)
    }

  return (
    <div className={classes.bookingForm}>
      <form>
        <button onClick={toggleForm} ></button>
        
        <div>
          <label>Personal Information</label>
          <input type='text' name='firstName' placeholder='First Name:'></input>
      
          <input type='text' name='lastName' placeholder='Last Name:'></input>

          <input type='date' name='birthDay' placeholder='Date of birth:'></input>


          <select name='gender'>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        
        <div>
          <label>Contact Information</label>
          <input type='email' name='email' placeholder='Email adress:'></input>
          <div>
            <input type='tel1' pattern='[0-9]{2,3}' name='tel' placeholder='Country Code:'></input>
            <input type='tel2' pattern='[0-9]{4,8}' name='tel' placeholder='Phonenumber:'></input>
          </div>
        </div>
    
        <div>
          <label>Documents</label>
          <input type='text' name='birthPlace' placeholder='Place of birth:'></input>
          <input type='text' name='city' placeholder='City:'></input>
          <input type='text' name='nationality' placeholder='Nationality:'></input>
          <input type='text' name='nationality' placeholder='Passport Number:'></input>
          <input type='date' name='issueDate' placeholder='Issuance Date:'></input>
          <input type='date' name='expiryDate' placeholder='Expiry Date:'></input>
        </div>
      </form> 
    </div>
  )
}

export default BookingForm
