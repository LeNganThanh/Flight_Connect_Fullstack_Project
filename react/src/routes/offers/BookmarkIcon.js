import React, { useContext, useEffect, useState } from 'react';
import { FlightsContext } from '../../context/FlightsContext';
import classes from './Offers.module.css';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const BookmarkIcon = props => {
  const [state, dispatch] = useContext(FlightsContext);
  const [active, setActive] = useState(false)
  const { offer } = props;
  const [id, setId] = useState(false);

//===> bookmark class handler
 
useEffect(() => {
  if(state.bookmarks.includes(props.iOffer)){
    setActive(true)
  }else{
    setActive(false)
  }
}, [])

  const bookmarkFlight = e => {
    e.preventDefault();

    if (!state.user) {
      dispatch({
        type: 'setLogin',
        login: true,
      });
    } else {
      fetch('http://localhost:1338/flights', {
        method: 'POST',
        headers: {
          token: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flight: JSON.stringify(offer),
          userId: state.user._id,
        }),
      })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            if (e.target.name === 'icon') {
            
              document
                .getElementById('change')
                .classList.add(`${classes.change}`);
              setTimeout(() => {
                document
                  .getElementById('change')
                  .classList.remove(`${classes.change}`);
              }, 2000);
            } else {
              /* e.target.classList.add(`${classes.bookMarked}`); */
              document
                .getElementById('change')
                .classList.add(`${classes.change}`);
              setTimeout(() => {
                document
                  .getElementById('change')
                  .classList.remove(`${classes.change}`);
              }, 2000);
            }

            setId(result.data.flights.at(-1)._id);

            dispatch({
              type: 'setUser',
              user: result.data,
            });
          }
        });
    }
  };

  const deleteBookmark = e => {
    e.preventDefault();

    fetch(`http://localhost:1338/flights/${id}`, {
      method: 'DELETE',
      headers: { token: localStorage.getItem('token') },
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
  };

  const toggleBookmark = e => {
    if (e.target.classList.contains(classes.bookMarked)) {
      deleteBookmark(e);
      setActive(false)
      dispatch({
        type: 'deleteBookmark',
        bookmark: props.iOffer
      })
    } else {
      bookmarkFlight(e);
      setActive(true)
      dispatch({
        type: 'setBookmarks',
        bookmark: props.iOffer
      })
      
    }
  };

  return (
    <div>
      <Button name="icon" onClick={toggleBookmark} className={active && state.user ? classes.bookMarked : ''}>
        <FontAwesomeIcon className={classes.bookmarkIcon} icon={faBookmark} />
      </Button>
    </div>
  );
};

export default BookmarkIcon;
