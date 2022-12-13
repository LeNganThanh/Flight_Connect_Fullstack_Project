import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import classes from './Activities.module.css';
import { FlightsContext } from '../../context/FlightsContext';
import { getDetails } from '../../api/details.api.js';
import { getPhotos } from '../../api/photos.api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button.js';

const Activities = props => {
  const [state, dispatch] = useContext(FlightsContext);
  const { activities, offers } = state;

  const inputTo = document.getElementById('to');

  const [counter, setCounter] = useState(0);
  const [photoCounter, setPhotoCounter] = useState([0, 0, 0]);
  const [divider, setDivider] = useState(0);
  const [details, setDetails] = useState(false)
  const [photos, setPhotos] = useState(false)

  useEffect(() => {
      if (photos === false) {
        setPhotos(activities[1])
      }
  }, [activities]);

  // useEffect(() => {
  //   if (photos){
  //     if (activities[0].length >= divider + 2) {
  //       const places = activities[0]
  //         .slice(divider, divider + 3)
  //         .map(act => act.place_id);

  //       getDetails({ placeIds: places }).then(res => {
  //         if (photos[0].length === 1) {
  //           setDetails(res.data[0])
  //           setPhotos(res.data[1])
  //         } else {
  //           const currDetails = [...details];
  //           const currPhotos = [...photos];
  //           res.data[0].map(data => currDetails.push(data));
  //           res.data[1].map(data => currPhotos.push(data));
  //           setDetails(currDetails)
  //           setPhotos(currPhotos)
  //         }
  //       });
  //       setDivider(divider + 3);
  //     }
  //   }
  // }, [photos])

  const previous = () => {
    if (counter > 2) {
      setCounter(Number(counter) - 3);
      setPhotoCounter([0, 0, 0]);
    }
  };
  const next = () => {
    if ((Number(counter) + 3) < details.length && photos[Number(counter) + 3]) {
      setCounter(Number(counter) + 3)
      setPhotoCounter([0, 0, 0])
    }
  };

  const prevPhoto = (e) => {
    const num = Number(e.target.value || e.target.parentElement.value)
    const photoCount = Number(photoCounter[num])

    if (photoCount > 0) {
      if (Number(num) === 0) {
        setPhotoCounter([
          Number(Number(photoCount) - 1),
          Number(photoCounter[1]),
          Number(photoCounter[2]),
        ]);
      } else if (Number(num) === 1) {
        setPhotoCounter([
          Number(photoCounter[0]),
          Number(Number(photoCount) - 1),
          Number(photoCounter[2]),
        ]);
      } else if (Number(num) === 2) {
        setPhotoCounter([
          Number(photoCounter[0]),
          Number(photoCounter[1]),
          Number(Number(photoCount) - 1),
        ]);
      }
    }
  };

  const nextPhoto = (e) => {
    const num = Number(e.target.value || e.target.parentElement.value)
    const count = Number(counter)
    const photoCount = Number(photoCounter[num])

    if (
      undefined ===
      photos[Number(count) + Number(num)][Number(photoCount) + 1]
      && details[Number(count) + Number(num)].photos[Number(photoCount) + 1].photo_reference
    ) {
      getPhotos({
        photoId: details[Number(count) + Number(num)].photos[Number(photoCount) + 1].photo_reference
      })
      .then(res => {
        const currPhotos = [...photos]
        currPhotos[Number(count) + Number(num)].push(res.data)
        setPhotos(currPhotos)
      })
      if (num === 0) {
        setPhotoCounter([
          Number(Number(photoCount) + 1),
          Number(photoCounter[1]),
          Number(photoCounter[2]),
        ]);
      } else if (num === 1) {
        setPhotoCounter([
          Number(photoCounter[0]),
          Number(Number(photoCount) + 1),
          Number(photoCounter[2]),
        ]);
      } else if (num === 2) {
        setPhotoCounter([
          Number(photoCounter[0]),
          Number(photoCounter[1]),
          Number(Number(photoCount) + 1),
        ]);
      }
    } else {
      if (num === 0) {
        setPhotoCounter([
          Number(Number(photoCount) + 1),
          Number(photoCounter[1]),
          Number(photoCounter[2]),
        ]);
      } else if (num === 1) {
        setPhotoCounter([
          Number(photoCounter[0]),
          Number(Number(photoCount) + 1),
          Number(photoCounter[2]),
        ]);
      } else if (num === 2) {
        setPhotoCounter([
          Number(photoCounter[0]),
          Number(photoCounter[1]),
          Number(Number(photoCount) + 1),
        ]);
      }
    }
  };

  const imageRef = num => {
    const search = activities[0][Number(counter) + Number(num)].name;
    const result = `https://www.google.com/maps/search/${search}`;
    return result;
  };

  useLayoutEffect(() => {
    setCounter(0);
    setPhotoCounter([0, 0, 0]);
  }, [offers]);

  return (
    <div>
      {photos && photos !== undefined ? (
        <div>
          <h2 className={classes.topTitle}>Attractions in {inputTo.value}</h2>
          <div className={classes.activBox}>
            <Button className={classes.slidesBtn} onClick={previous}>
              <FontAwesomeIcon onClick={previous} icon={faChevronLeft} />
            </Button>


              {[0, 1, 2].map(num => {
                return (
                  <div key={num} className={classes.article}>
                    <div className={classes.photoControl}>
                      <Button value={num} className={classes.picBtn} onClick={prevPhoto}>
                        <FontAwesomeIcon  icon={faChevronLeft} />
                      </Button>
                      <Button value={num} className={classes.picBtn} onClick={nextPhoto}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </Button>
                    </div>
                    {photos[Number(counter) + Number(num)][photoCounter[num]] ? 
                      <a href={imageRef(num)} target='_blank'>
                        <img src={photos[Number(counter) + Number(num)][photoCounter[num]]}></img>
                      </a> 
                    : null}
                    <h3>{activities[0][Number(counter) + Number(num)].name}</h3>
                    
                  </div>
                )
              }) }  
                  
            <Button className={classes.slidesBtn} onClick={next}>
            <FontAwesomeIcon onClick={next} icon={faChevronRight} />

            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Activities;
