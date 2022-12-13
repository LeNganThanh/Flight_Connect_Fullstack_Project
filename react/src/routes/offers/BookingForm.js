import React, { useEffect, useLayoutEffect, useState } from 'react';
import classes from './Booking.module.css';
import Button from '../../components/Button';

const BookingForm = props => {
  const adults = document.getElementById('adults').value || 1;
  const children = document.getElementById('children').value || 0;
  const [adultsArr, setAdultsArr] = useState(false);
  const [childrenArr, setChildrenArr] = useState(false);
  const [akkordeon, setAkkordeon] = useState(0);

  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

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

  const submitOrder = e => {
    e.preventDefault();
    const adultForms = document.querySelectorAll('.adultForm');
    const childForms = document.querySelectorAll('.childForm');
    console.log(adultForms);
    console.log(childForms);
  };

  return (
    <div className={classes.bookingForm}>
      <button className={classes.backButton} onClick={toggleForm}>Back</button>

      {adultsArr
        ? adultsArr.map((traveler, i) => {
            return (
              <div key={i} className={classes.AdultContainer}>
                <button onClick={() => setAkkordeon(i)}>Adult {i + 1}</button>
                <form
                  className={`adultForm ${
                    i === Number(akkordeon) ? classes.visible : classes.invis
                  }`}
                >
                  <div>
                    <label>Personal Information</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name:"
                    ></input>

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name:"
                    ></input>

                    <input
                      type="date"
                      name="birthDay"
                      placeholder="Date of birth:"
                    ></input>

                    <select name="gender">
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>

                  <div>
                    <label>Contact Information</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email adress:"
                    ></input>
                    <div>
                      <input
                        type="tel1"
                        pattern="[0-9]{2,3}"
                        name="tel"
                        placeholder="Country Code:"
                      ></input>
                      <input
                        type="tel2"
                        pattern="[0-9]{4,8}"
                        name="tel"
                        placeholder="Phonenumber:"
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label>Documents</label>
                    <input
                      type="text"
                      name="birthPlace"
                      placeholder="Place of birth:"
                    ></input>
                    <input type="text" name="city" placeholder="City:"></input>
                    <input
                      type="text"
                      name="nationality"
                      placeholder="Nationality:"
                    ></input>
                    <input
                      type="text"
                      name="nationality"
                      placeholder="Passport Number:"
                    ></input>
                    <input
                      type="date"
                      name="issueDate"
                      placeholder="Issuance Date:"
                    ></input>
                    <input
                      type="date"
                      name="expiryDate"
                      placeholder="Expiry Date:"
                    ></input>
                  </div>
                </form>
              </div>
            );
          })
        : null}
      {childrenArr
        ? childrenArr.map((child, i) => {
            const open = () => {
              console.log(Number(i) + Number(adults));
              setAkkordeon(Number(i) + Number(adults));
            };

            return (
              <div key={i} className={classes.childContainer}>
                <button onClick={open}>Child {i + 1}</button>
                <form
                  className={`childForm ${
                    Number(i) + Number(adults) === Number(akkordeon)
                      ? classes.visible
                      : classes.invis
                  }`}
                >
                  <div>
                    <label>Personal Information</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name:"
                    ></input>

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name:"
                    ></input>

                    <input
                      type="date"
                      name="birthDay"
                      placeholder="Date of birth:"
                    ></input>

                    <select name="gender">
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>
                </form>
              </div>
            );
          })
        : null}
      <button onClick={submitOrder}>Submit</button>
    </div>
  );
};

export default BookingForm;
