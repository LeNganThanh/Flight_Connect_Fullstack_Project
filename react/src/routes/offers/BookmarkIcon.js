import React, { useContext, useEffect, useState } from 'react';
import { FlightsContext } from '../../context/FlightsContext';
import classes from './Offers.module.css';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const BookmarkIcon = props => {
  const [state, dispatch] = useContext(FlightsContext);
  const [active, setActive] = useState(false);
  const { offer } = props;
  const [index, setIndex] = useState(false);

  //===> bookmark class handler

  useEffect(() => {
    const check = state.bookmarks.map(mark => {
      if (mark.includes(props.value)) {
        return true;
      } else {
        return false;
      }
    }, []);

    if (check.includes(true)) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const bookmarkFlight = e => {
    e.preventDefault();

    if (!state.user) {
      dispatch({
        type: 'setLogin',
        login: true,
      });
    } else {
      fetch('/flights', {
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

            dispatch({
              type: 'setBookmarks',
              bookmark: [
                ...state.bookmarks,
                [result.data.flights.at(-1)._id, props.value],
              ],
            });

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
    const check = state.bookmarks.map(mark => {
      if (mark.includes(props.value)) {
        return true;
      } else {
        return false;
      }
    });
    fetch(
      `http://localhost:1338/flights/${
        state.bookmarks[check.indexOf(true)][0]
      }`,
      {
        method: 'DELETE',
        headers: { token: localStorage.getItem('token') },
      }
    )
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          dispatch({
            type: 'deleteBookmark',
            bookmark: check.indexOf(true),
          });
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
    } else {
      bookmarkFlight(e);
    }
  };

  return (
    <div>
      <Button
        name="icon"
        onClick={toggleBookmark}
        className={active && state.user ? classes.bookMarked : ''}
      >
        <FontAwesomeIcon className={classes.bookmarkIcon} icon={faBookmark} />
      </Button>
    </div>
  );
};

export default BookmarkIcon;
