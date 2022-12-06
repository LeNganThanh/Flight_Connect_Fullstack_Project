import React, { useState, useContext, } from "react";
import classes from "./Activities.module.css";
import { FlightsContext } from "../../context/FlightsContext";

const Activities = props => {
  const [state] = useContext(FlightsContext);
  const { activities } = state;

  //function use to clear all html tags includes in description from api
  function extractContent(html) {
    return new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent;
  }
  const [counter, setCounter] = useState(0)

  const previous = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }
  const next = () => {
    if (counter < (activities[0].length - 1)) {
      setCounter(counter + 1)
    }
  }

  const imageRef = () => {
    const search = activities[0][counter].name
    const result =`https://www.google.com/maps/search/${search}`
    return result
  }

  return (
    <div>
      {activities.length > 0 ? (
        <div>
          <h1 className={classes.topTitle}>TOP ACTIVITIES</h1>
          <div className={classes.activBox}>
            <button onClick={previous}>{'<'}</button>
                <div>
                  <div className={classes.article}>
                    <a href={imageRef()} target='_blank'><img src={activities[1][counter]}></img></a>
                    <h3>{activities[0][counter].name} </h3>
                    <div className={classes.para}>
                      <p>{extractContent(activities[0][counter].types.join(' | '))}</p>
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
