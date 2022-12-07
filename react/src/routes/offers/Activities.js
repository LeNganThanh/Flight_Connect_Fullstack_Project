import React, { useState, useContext, useLayoutEffect } from 'react';
import classes from './Activities.module.css';
import { FlightsContext } from '../../context/FlightsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button.js'

const Activities = props => {
  const [state] = useContext(FlightsContext);
  const { activities } = state;

  const inputTo = document.getElementById('to');

  //function use to clear all html tags includes in description from api
  function extractContent(html) {
    return new DOMParser().parseFromString(html, 'text/html').documentElement
      .textContent;
  }
  const [counter, setCounter] = useState(0);
  //const [photoCounter, setPhotoCounter] = useState(0)

  const previous = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      //setPhotoCounter(0)
    }
  };
  const next = () => {
    if (counter < activities[0].length - 1) {
      setCounter(counter + 1);
      //setPhotoCounter(0)
    }
  };

  // const prevPhoto = () => {
  //   if (photoCounter > 0) {
  //     setPhotoCounter(photoCounter - 1)
  //   }
  // }
  // const nextPhoto = () => {
  //   if (photoCounter < (activities[1][counter].length - 1)) {
  //     setPhotoCounter(photoCounter + 1)
  //   }
  // }

  const imageRef = () => {
    const search = activities[0][counter].name;
    const result = `https://www.google.com/maps/search/${search}`;
    return result;
  };

  useLayoutEffect(() => {
    setCounter(0);
    //setPhotoCounter(0)
  }, [activities]);

  return (
    <div>
      {activities.length > 0 ? (
        <div>
          <h2 className={classes.topTitle}>Attractions in {inputTo.value}</h2>
          <div className={classes.activBox}>
              <Button className={classes.slidesBtn} onClick={previous}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
            <div>
              <div className={classes.article}>
                <a href={imageRef()} target="_blank">
                  <img src={activities[1][counter]} alt='slide'></img>
                </a>
                <h3>{activities[0][counter].name} </h3>
                <div className={classes.para}>
                  <p>
                    {extractContent(activities[0][counter].types.join(' | '))}
                  </p>
                </div>
                  
              </div>
            </div>
                <Button className={classes.slidesBtn} onClick={next}>
                <FontAwesomeIcon icon={faChevronRight} />
                </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Activities;
