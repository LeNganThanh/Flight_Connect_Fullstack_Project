import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import classes from './Booking.module.css';
import BookedFlight from './BookedFlight';
import { placeOrder } from '../../api/booking.price.api.js';
import { FlightsContext } from '../../context/FlightsContext';
import toast, { Toaster } from 'react-hot-toast';

const BookingForm = props => {
  const [state, dispatch] = useContext(FlightsContext);
  const [adultsArr, setAdultsArr] = useState(false);
  const [childrenArr, setChildrenArr] = useState(false);
  const [akkordeon, setAkkordeon] = useState(0);
  const [bookedFlight, setBookedFlight] = useState(false);

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

  useEffect(() => {
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll, false);
    };
  });

  useLayoutEffect(() => {
    let arr1 = [];
    let arr2 = [];

    props.offer.travelerPricings.map(trav => {
      if (trav.travelerType === 'ADULT') {
        arr1.push([]);
      } else {
        arr2.push([]);
      }
    });

    setAdultsArr(arr1);
    setChildrenArr(arr2);
  }, []);

  const toggleForm = () => {
    props.setToggle(false);
  };

  const submitOrder = e => {
    e.preventDefault();
    const adultForms = document.querySelectorAll('.adultForm');
    const childForms = document.querySelectorAll('.childForm');

    const travelerArr = [];
    adultForms.forEach((form, i) => {
      travelerArr.push({
        id: Number(i) + 1,
        dateOfBirth: form.birthDay.value,
        name: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
        },
        gender: form.gender.value,
        contact: {
          emailAddress: form.email.value,
          phones: [
            {
              deviceType: 'MOBILE',
              countryCallingCode: form.tel1.value,
              number: form.tel2.value,
            },
          ],
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
            holder: true,
          },
        ],
      });
    });

    childForms.forEach((form, i) => {
      travelerArr.push({
        id: Number(i) + Number(adultsArr.length) + 1,
        dateOfBirth: form.birthDay.value,
        name: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
        },
        gender: form.gender.value,
        contact: {
          emailAddress: travelerArr[0].contact.emailAddress,
          phones: [
            {
              deviceType: 'MOBILE',
              countryCallingCode:
                travelerArr[0].contact.phones[0].countryCallingCode,
              number: travelerArr[0].contact.phones[0].number,
            },
          ],
        },
      });
    });
    placeOrder({
      order: props.offer,
      travelers: travelerArr,
    }).then(result => {
      if (result.data.data && state.user) {
        console.log(result.data.data);
        setBookedFlight(result.data.data);
        fetch('/orders', {
          method: 'POST',
          headers: {
            token: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orders: JSON.stringify(result.data.data),
            totalPrice: `${result.data.data.flightOffers[0].price.total}${result.data.data.flightOffers[0].price.currency}`,
            userId: state.user._id,
          }),
        })
          .then(res => res.json())
          .then(result => {
            if (result.success) {
              dispatch({
                type: 'setUser',
                user: result.data,
              });
            }
          });
      } else if (result.data.data) {
        setBookedFlight(result.data.data);
      } else {
        toast.error('Sorry this flight is already full');
      }
    });
  };

  return (
    <div className={classes.main}>
      <button className={classes.backBtn} onClick={toggleForm}>Back</button>
      <div className={classes.bookingForm}>
        {adultsArr && !bookedFlight
          ? adultsArr.map((traveler, i) => {
              return (
                <div key={i}>
            
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
                        defaultValue='1984-06-06'
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
                        placeholder="Email address:"
                        defaultValue='example@example.com'
                      ></input>

                      <input
                        type="tel"
                        pattern="[0-9]{2,3}"
                        name="tel1"
                        defaultValue='49'
                        placeholder="Country Code:"
                      ></input>
                      <input
                        type="tel"
                        pattern="[0-9]{4,8}"
                        name="tel2"
                        placeholder="Phonenumber:"
                        defaultValue='2346742'
                      ></input>
                    </div>

                    <div>
                      <label>Documents</label>
                      <input
                        type="text"
                        name="birthPlace"
                        placeholder="Place of birth: (Berlin)"
                      ></input>
                      <input
                        type="text"
                        name="city"
                        placeholder="City name: (London)"
                      ></input>
                      <input
                        type="text"
                        name="nationality"
                        placeholder="Nationality: (DE, FR)"
                      ></input>
                      <input
                        type="number"
                        defaultValue='1234567'
                        name="passport"
                        placeholder="Passport Number:"
                      ></input>
                      <input
                        type="date"
                        name="issueDate"
                        defaultValue='2022-01-01'
                        placeholder="Issuance Date:"
                      ></input>
                      <input
                        type="date"
                        name="expiryDate"
                        defaultValue='2026-01-01'
                        placeholder="Expiry Date:"
                      ></input>
                    </div>
                  </form>
                </div>
              );
            })
          : null}
        {childrenArr && !bookedFlight
          ? childrenArr.map((child, i) => {
              const open = () => {
                setAkkordeon(Number(i) + Number(adultsArr.length));
              };

              return (
                <div key={i}>
                  <button onClick={open}>Child {i + 1}</button>
                  <form
                    className={`childForm ${
                      Number(i) + Number(adultsArr.length) === Number(akkordeon)
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
      </div>
      <div className={classes.submitBtn}>

      {!bookedFlight ? (
        <button  onClick={submitOrder}>
          Submit
        </button>
      ) : null}
      </div>
      {bookedFlight ? <BookedFlight bookedFlight={bookedFlight} /> : null}
      <Toaster position="top-center" />
    </div>
  );
};

export default BookingForm;
