
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
    if ((counter + 3) < activities[0].length) {
      setCounter(Number(counter) + 3)
      setPhotoCounter([0, 0, 0])
    }
  };

  const prevPhoto = (e) => {
    console.log(e.target.key, e.target.value, e.target)
    const num = Number(e.target.value)
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
    console.log(e.target.value, e.target)
    const num = Number(e.target.value)
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

                <div className={classes.article}>
                  <Button value={0} className={classes.slidesBtn} onClick={prevPhoto}>
                    <FontAwesomeIcon value={0} onClick={prevPhoto} icon={faChevronLeft} />
                  </Button>
                  {activities[1][counter][photoCounter[0]] ? <a href={imageRef(0)} target='_blank'><img src={activities[1][counter][photoCounter[0]]}></img></a> : null}
                  <Button value={0} className={classes.slidesBtn} onClick={nextPhoto}>
                    <FontAwesomeIcon value={0} onClick={nextPhoto} icon={faChevronRight} />
                  </Button>
                  <h3>{activities[0][counter].name}</h3>
                  <div className={classes.para}>
                    <p>{activities[0][counter].types.join(' | ')}</p>
                  </div>
                </div>

                <div className={classes.article}>
                  <Button value={1} className={classes.slidesBtn} onClick={prevPhoto}>
                    <FontAwesomeIcon value={1} onClick={prevPhoto} icon={faChevronLeft} />
                  </Button>
                  {activities[1][counter + 1][photoCounter[1]] ? <a href={imageRef(1)} target='_blank'><img src={activities[1][counter + 1][photoCounter[1]]}></img></a> : null}
                  <Button value={1} className={classes.slidesBtn} onClick={nextPhoto}>
                    <FontAwesomeIcon value={1} onClick={nextPhoto} icon={faChevronRight} />
                  </Button>
                  <h3>{activities[0][counter + 1].name}</h3>
                  <div className={classes.para}>
                    <p>{activities[0][counter + 1].types.join(' | ')}</p>
                  </div>
                </div>

                <div className={classes.article}>
                  <Button value={2} className={classes.slidesBtn} onClick={prevPhoto}>
                    <FontAwesomeIcon value={2} onClick={prevPhoto} icon={faChevronLeft} />
                  </Button>
                  {activities[1][counter + 2][photoCounter[2]] ? <a href={imageRef(2)} target='_blank'><img src={activities[1][counter + 2][photoCounter[2]]}></img></a> : null}
                  <Button value={2} className={classes.slidesBtn} onClick={nextPhoto}>
                    <FontAwesomeIcon value={1} onClick={nextPhoto} icon={faChevronRight} />
                  </Button>
                  <h3>{activities[0][counter + 2].name}</h3>
                  <div className={classes.para}>
                    <p>{activities[0][counter + 2].types.join(' | ')}</p>
                  </div>
                </div>
                  
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
