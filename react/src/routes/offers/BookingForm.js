
import React, { useEffect, useLayoutEffect, useState } from 'react'
import classes from './Booking.module.css'
import Button from '../../components/Button'
import {placeOrder} from '../../api/booking.price.api.js'

  const BookingForm = (props) => {
    const adults = document.getElementById('adults').value || 1
    const children = document.getElementById('children').value || 0
    const [adultsArr, setAdultsArr] = useState(false)
    const [childrenArr, setChildrenArr] = useState(false)
    const [akkordeon, setAkkordeon] = useState(0)


    function preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    useEffect(() => {
      window.addEventListener('wheel', preventScroll, {passive: false});

      return () => {
        window.removeEventListener('wheel', preventScroll, false)
      }
    })


  useEffect(() => {
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll, false);
    };
  });

  useLayoutEffect(() => {
    let arr1 = [];
    for (let i = 0; i < adults; i++) {
      arr1.push([]);
    }
    setAdultsArr(arr1);

    let arr2 = [];
    for (let i = 0; i < children; i++) {
      arr2.push([]);
    }
    setChildrenArr(arr2);
  }, []);

  const toggleForm = () => {
    props.setToggle(false);
  };


  const submitOrder = (e) => {
    e.preventDefault()
    const adultForms = document.querySelectorAll('.adultForm')
    const childForms = document.querySelectorAll('.childForm')

    const travelerArr = []
    adultForms.forEach((form, i) => {
      travelerArr.push({
        id: (Number(i) + 1),
        dateOfBirth: form.birthDay.value,
        name: {
          firstName: form.firstName.value,
          lastName: form.lastName.value
        },
        gender: form.gender.value,
        contact: {
          emailAddress: form.email.value,
          phones: [
            {
              deviceType: 'MOBILE',
              countryCallingCode: form.tel1.value,
              number: form.tel2.value
            }
          ]
        },
        documents: [
          {
            documentType: 'PASSPORT',
            birthPlace: form.birthPlace.value,
            issuanceLocation: form.city.value,
            issuanceDate: form.issueDate.value,
            number: form.passport.value,
            expiryDate: form.expiryDate.value,
            issuanceCountry: form.nationality.value,
            issuanceValidity: form.nationality.value,
            nationality: form.nationality.value,
            holder: true
          }
        ]
      })
    })

    childForms.forEach((form, i) => {
      travelerArr.push({
        id: (Number(i) + Number(adults) + 1),
        dateOfBirth: form.birthDay.value,
        name: {
          firstName: form.firstName.value,
          lastName: form.lastName.value
        },
        gender: form.gender.value,
        contact: {
          emailAddress: travelerArr[0].contact.emailAddress,
          phones: [
            {
              deviceType: 'MOBILE',
              countryCallingCode: travelerArr[0].contact.phones[0].countryCallingCode,
              number: travelerArr[0].contact.phones[0].number
            }
          ]
        },

      })
    })
    placeOrder({
      order: props.offer,
      travelers: travelerArr
    })
  }



  return (
    <div className={classes.bookingForm}>

    <button onClick={toggleForm} ></button>
      {
      adultsArr ? adultsArr.map((traveler, i) => {

        return (
          <div  key={i}>
          <button onClick={() => setAkkordeon(i)}>Adult {i + 1}</button>
          <form className={`adultForm ${i === Number(akkordeon) ? classes.visible : classes.invis}`}>
            
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
              <input type='email' name='email' placeholder='Email address:'></input>
              <div>
                <input type='tel' pattern='[0-9]{2,3}' name='tel1' placeholder='Country Code:'></input>
                <input type='tel' pattern='[0-9]{4,8}' name='tel2' placeholder='Phonenumber:'></input>
              </div>
            </div>
        
            <div>
              <label>Documents</label>
              <input type='text' name='birthPlace' placeholder='Place of birth:'></input>
              <input type='text' name='city' placeholder='City:'></input>
              <input type='text' name='nationality' placeholder='Nationality:'></input>
              <input type='number' name='passport' placeholder='Passport Number:'></input>
              <input type='date' name='issueDate' placeholder='Issuance Date:'></input>
              <input type='date' name='expiryDate' placeholder='Expiry Date:'></input>
            </div>
          </form>
          </div>
        )

      }) : null
      }
      {
      childrenArr ? childrenArr.map((child, i) => {

        const open = () => {
          console.log(Number(i) + Number(adults))
          setAkkordeon(Number(i) + Number(adults))
        }

        return (
          <div key={i}>
          <button onClick={open}>Child {i + 1}</button>
          <form className={`childForm ${Number(i) + Number(adults) === Number(akkordeon) ? classes.visible : classes.invis}`}>
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
            
          </form>
          </div>
        )

      }) : null
      }
    <button onClick={submitOrder}>Submit</button>

    </div>
  );
};

export default BookingForm;
