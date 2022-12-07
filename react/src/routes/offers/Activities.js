import React, { useState, useContext, useLayoutEffect, } from "react";
import classes from "./Activities.module.css";
import { FlightsContext } from "../../context/FlightsContext";
import {getDetails} from '../../api/details.api.js'

const Activities = props => {
  const [state, dispatch] = useContext(FlightsContext);
  const { activities, offers } = state;

  const inputTo = document.getElementById("to");

  const [counter, setCounter] = useState(0)
  const [photoCounter, setPhotoCounter] = useState([0, 0, 0])

  const previous = () => {
    if (counter > 0) {
      setCounter(counter - 3)
      setPhotoCounter([0, 0, 0])
    }
  }
  const next = () => {
    if ((counter + 3) < activities[0].length) {
      setCounter(counter + 3)
      setPhotoCounter([0, 0, 0])
    }
  }

  const prevPhoto = (e) => {
    e.preventDefault()
    const num = Number(e.target.value)

    if (photoCounter[num] > 0) {
      if (num === 0) {
        setPhotoCounter([photoCounter[0] + 1, photoCounter[1], photoCounter[2]])
      } else if (num === 1) {
        setPhotoCounter([photoCounter[0], photoCounter[1] + 1, photoCounter[2]])
      } else if (num === 2) {
        setPhotoCounter([photoCounter[0], photoCounter[1], photoCounter[2] + 1])
      }
    }
  }
  const nextPhoto = async(e) => {
    e.preventDefault()
    const num = Number(e.target.value)

    if (!activities[1][counter + num][photoCounter[num] + 1]  && activities[1][counter + num].length === 1) {
      await getDetails({
        placeId: activities[0][counter + num].place_id
      })
      .then(res => {
        console.log([[...activities[0]],[...activities[1], activities[1][counter + num] = res.data]])
        dispatch({
          type: 'setActivities',
          activities: [[...activities[0]], [...activities[1], activities[1][counter + num] = res.data]]
        })
      })
      if (num === 0) {
        setPhotoCounter([photoCounter[0] + 1, photoCounter[1], photoCounter[2]])
      } else if (num === 1) {
        setPhotoCounter([photoCounter[0], photoCounter[1] + 1, photoCounter[2]])
      } else if (num === 2) {
        setPhotoCounter([photoCounter[0], photoCounter[1], photoCounter[2] + 1])
      }
    } 

    if (activities[1][counter + num][photoCounter[num] + 1]) {
      if (num === 0) {
        setPhotoCounter([photoCounter[0] + 1, photoCounter[1], photoCounter[2]])
      } else if (num === 1) {
        setPhotoCounter([photoCounter[0], photoCounter[1] + 1, photoCounter[2]])
      } else if (num === 2) {
        setPhotoCounter([photoCounter[0], photoCounter[1], photoCounter[2] + 1])
      }
    }
  }

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
            <button onClick={previous}>{'<'}</button>
                <div>
                  <div className={classes.article}>
                    <button value={0} onClick={prevPhoto}>{'<'}</button>
                    {activities[1][counter][photoCounter[0]] ? <a href={imageRef(0)} target='_blank'><img src={activities[1][counter][photoCounter[0]]}></img></a> : null}
                    <button value={0} onClick={nextPhoto}>{'>'}</button>
                    <h3>{activities[0][counter].name}</h3>
                    <div className={classes.para}>
                      <p>{activities[0][counter].types.join(' | ')}</p>
                    </div>
                  </div>

                  <div className={classes.article}>
                    <button value={1} onClick={prevPhoto}>{'<'}</button>
                    {activities[1][counter + 1][photoCounter[1]] ? <a href={imageRef(1)} target='_blank'><img src={activities[1][counter + 1][photoCounter[1]]}></img></a> : null}
                    <button value={1} onClick={nextPhoto}>{'>'}</button>
                    <h3>{activities[0][counter + 1].name}</h3>
                    <div className={classes.para}>
                      <p>{activities[0][counter + 1].types.join(' | ')}</p>
                    </div>
                  </div>

                  <div className={classes.article}>
                    <button value={2} onClick={prevPhoto}>{'<'}</button>
                    {activities[1][counter + 2][photoCounter[2]] ? <a href={imageRef(2)} target='_blank'><img src={activities[1][counter + 2][photoCounter[2]]}></img></a> : null}
                    <button value={2} onClick={nextPhoto}>{'>'}</button>
                    <h3>{activities[0][counter + 2].name}</h3>
                    <div className={classes.para}>
                      <p>{activities[0][counter + 2].types.join(' | ')}</p>
                    </div>
                  </div>
                </div>
            <button onClick={next}>{'>'}</button>
         </div>
        </div>
      ) : null}
    </div>
  );
};

export default Activities;
