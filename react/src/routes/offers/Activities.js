
import React, { useState, useContext, useLayoutEffect, useEffect, } from "react";
import classes from "./Activities.module.css";
import { FlightsContext } from "../../context/FlightsContext";
import {getDetails} from '../../api/details.api.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button.js'

const Activities = props => {
  const [state, dispatch] = useContext(FlightsContext);
  const { activities, offers } = state;

  const inputTo = document.getElementById('to');

  const [counter, setCounter] = useState(0)
  const [photoCounter, setPhotoCounter] = useState([0, 0, 0])
  const [divider, setDivider] = useState(0)

  useEffect(() => {
    if(!localStorage.getItem('activities')) {
      if (activities[0].length >= divider + 2) {
        console.log(activities)
        console.log(divider)
        const places = activities[0].slice(divider, divider + 3).map(act => act.place_id)

        getDetails({placeIds: places})
        .then(res => {
          console.log(res)
          const info = [...activities[0]]
          if (activities[1][0].length === 1) {
            dispatch({
              type: 'setActivities',
              activities: [info, res.data]
            })
          } else {
            const curr = activities[1]
            res.data.map(pic => curr.push(pic))
            console.log('spreadphotos', curr)
            dispatch({
              type: 'setActivities',
              activities: [info, curr]
            })
          }
        })
        setDivider(divider + 3)
        if (activities[0].length === activities[1].length) {
          localStorage.setItem('activities', JSON.stringify(activities))
        }
      }
    } else if (localStorage.getItem('activities') && activities[0].length !== activities[1].length){
      console.log('localStorage')
        dispatch({
          type: 'setActivities',
          activities: JSON.parse(localStorage.getItem('activities'))
        })
    }
  }, [activities])

  const previous = () => {
    if (counter > 2) {
      setCounter(Number(counter) - 3)
      setPhotoCounter([0, 0, 0])
    }
  }
  const next = () => {
    if ((Number(counter) + 3) < activities[0].length && activities[1][Number(counter) + 3]) {
      setCounter(Number(counter) + 3)
      setPhotoCounter([0, 0, 0])
    }
  };

  const prevPhoto = (e) => {
    const num = Number(e.target.value || e.target.parentElement.value)
    console.log(num)
    const photoCount = Number(photoCounter[num])
    if (photoCount > 0) {
      if (Number(num) === 0) {
        setPhotoCounter([Number(Number(photoCount) - 1), Number(photoCounter[1]), Number(photoCounter[2])])
      } else if (Number(num) === 1) {
        setPhotoCounter([Number(photoCounter[0]), Number(Number(photoCount) - 1), Number(photoCounter[2])])
      } else if (Number(num) === 2) {
        setPhotoCounter([Number(photoCounter[0]), Number(photoCounter[1]), Number(Number(photoCount) - 1)])
      }
    }
  }

  const nextPhoto = (e) => {
    const num = Number(e.target.value || e.target.parentElement.value)
    console.log(num)
    const count = Number(counter)
    const photoCount = Number(photoCounter[num])

    if (undefined === activities[1][Number(count) + Number(num)][Number(photoCount) + 1]) {
      console.log('no more pictures')
    } else {
      if (num === 0) {
        setPhotoCounter([Number(Number(photoCount) + 1), Number(photoCounter[1]), Number(photoCounter[2])])
      } else if (num === 1) {
        setPhotoCounter([Number(photoCounter[0]), Number(Number(photoCount) + 1), Number(photoCounter[2])])
      } else if (num === 2) {
        setPhotoCounter([Number(photoCounter[0]), Number(photoCounter[1]), Number(Number(photoCount) + 1)])
      }
    }
  }

  const imageRef = (num) => {
    const search = activities[0][Number(counter) + Number(num)].name
    const result =`https://www.google.com/maps/search/${search}`
    return result
  }

  useLayoutEffect(() => {
    setCounter(0)
    setPhotoCounter([0, 0, 0])
  }, [offers])
  
  return (
    <div>
      {activities.length > 0 ? (
        <div>
          <h2 className={classes.topTitle}>Attractions in {inputTo.value}</h2>
          <div className={classes.activBox}>
            <Button className={classes.slidesBtn} onClick={previous}>
              <FontAwesomeIcon onClick={previous} icon={faChevronLeft} />
            </Button>

              {[0, 1, 2].map(num => {
                return (
                  <div key={num} className={classes.article}>
                    <div>
                      <Button value={num} className={classes.slidesBtn} onClick={prevPhoto}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </Button>
                      <Button value={num} className={classes.slidesBtn} onClick={nextPhoto}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </Button>
                    </div>
                    {activities[1][Number(counter) + Number(num)][photoCounter[num]] ? 
                      <a href={imageRef(num)} target='_blank'>
                        <img src={activities[1][Number(counter) + Number(num)][photoCounter[num]]}></img>
                      </a> 
                    : null}
                    <h3>{activities[0][Number(counter) + Number(num)].name}</h3>
                    <div className={classes.para}>
                      <p>{activities[0][Number(counter) + Number(num)].types.join(' | ')}</p>
                    </div>
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
}

export default Activities;
