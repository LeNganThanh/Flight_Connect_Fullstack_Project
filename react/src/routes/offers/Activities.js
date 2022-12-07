
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
    e.preventDefault()
    const num = Number(e.target.value)
    const count = Number(counter)
    const photoCount = Number(photoCounter[num + count])
    console.log(count + num)
    if (photoCounter[num] > 0) {
      if (num === 0) {
        setPhotoCounter([Number(photoCount - 1), Number(photoCounter[1]), Number(photoCounter[2])])
      } else if (num === 1) {
        setPhotoCounter([Number(photoCounter[0]), Number(photoCount - 1), Number(photoCounter[2])])
      } else if (num === 2) {
        setPhotoCounter([Number(photoCounter[0]), Number(photoCounter[1]), Number(photoCount - 1)])
      }
    }
  }
  const nextPhoto = async(e) => {
    e.preventDefault()
    const num = Number(e.target.value)
    const count = Number(counter)
    const photoCount = Number(photoCounter[Number(num) + Number(count)])
    console.log(Number(count) + Number(num))
    console.log(counter, photoCounter)

    if (activities[1][Number(count) + Number(num)][Number(photoCount) + 1] === undefined && activities[1][Number(count) + Number(num)].length === 1) {
      await getDetails({
        placeId: activities[0][Number(count) + Number(num)].place_id
      })
      .then(res => { 
        const info = [...activities[0]]
        let photos = [...activities[1]]
        const please = photos.map((photos, index) => {
          if (Number(index) !== Number(count) + Number(num)){
            return photos
          } else {
            return res.data
          }
        })
        console.log([info, please])
        dispatch({
          type: 'setActivities',
          activities: [info, please]
        })
      })
        if (num === 0) {
          setPhotoCounter([Number(photoCount) + 1, Number(photoCounter[1]), Number(photoCounter[2])])
        } else if (num === 1) {
          setPhotoCounter([Number(photoCounter[0]), Number(photoCount) + 1, Number(photoCounter[2])])
        } else if (num === 2) {
          setPhotoCounter([Number(photoCounter[0]), Number(photoCounter[1]), Number(photoCount) + 1])
        }
    } 
      if (activities[1][Number(count) + Number(num)][Number(photoCount) + 1]) {
        if (num === 0) {
          setPhotoCounter([Number(photoCount) + 1, Number(photoCounter[1]), Number(photoCounter[2])])
        } else if (num === 1) {
          setPhotoCounter([Number(photoCounter[0]), Number(photoCount) + 1, Number(photoCounter[2])])
        } else if (num === 2) {
          setPhotoCounter([Number(photoCounter[0]), Number(photoCounter[1]), Number(photoCount) + 1])
        }
      }
  }

  useEffect(() => {
    console.log(counter, '-->', photoCounter)
  })

  const imageRef = (num) => {
    const search = activities[0][counter + num].name
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
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>

                <div className={classes.article}>
                  <Button value={0} className={classes.slidesBtn} onClick={prevPhoto}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Button>
                  {activities[1][counter][photoCounter[0]] ? <a href={imageRef(0)} target='_blank'><img src={activities[1][counter][photoCounter[0]]}></img></a> : null}
                  <Button value={0} className={classes.slidesBtn} onClick={nextPhoto}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                  <h3>{activities[0][counter].name}</h3>
                  <div className={classes.para}>
                    <p>{activities[0][counter].types.join(' | ')}</p>
                  </div>
                </div>

                <div className={classes.article}>
                  <Button value={1} className={classes.slidesBtn} onClick={prevPhoto}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Button>
                  {activities[1][counter + 1][photoCounter[1]] ? <a href={imageRef(1)} target='_blank'><img src={activities[1][counter + 1][photoCounter[1]]}></img></a> : null}
                  <Button value={1} className={classes.slidesBtn} onClick={nextPhoto}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                  <h3>{activities[0][counter + 1].name}</h3>
                  <div className={classes.para}>
                    <p>{activities[0][counter + 1].types.join(' | ')}</p>
                  </div>
                </div>

                <div className={classes.article}>
                  <Button value={2} className={classes.slidesBtn} onClick={prevPhoto}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Button>
                  {activities[1][counter + 2][photoCounter[2]] ? <a href={imageRef(2)} target='_blank'><img src={activities[1][counter + 2][photoCounter[2]]}></img></a> : null}
                  <Button value={2} className={classes.slidesBtn} onClick={nextPhoto}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                  <h3>{activities[0][counter + 2].name}</h3>
                  <div className={classes.para}>
                    <p>{activities[0][counter + 2].types.join(' | ')}</p>
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
}

export default Activities;
