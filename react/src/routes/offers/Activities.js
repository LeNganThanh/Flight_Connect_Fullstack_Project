import React, { useState, useContext, useEffect } from "react";
import classes from "./Activities.module.css";
import { FlightsContext } from "../../context/FlightsContext";

const Activities = props => {
  const [state] = useContext(FlightsContext);
  const { activities } = state;

  const [show, setShow] = useState(false);
  const [firstFourAct, setFirstFourAct] = useState(false);
  const [secondFourAct, setSecondFourAct] = useState(false);

  useEffect(() => {
    setFirstFourAct(activities[0].results.slice(0, 4));
    setSecondFourAct(activities[0].results.slice(4, 8));
  }, [activities]);

  //function use to clear all html tags includes in description from api
  function extractContent(html) {
    return new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent;
  }

  return (
    <div>
      {firstFourAct ? (
        <div>
          <h1 className={classes.topTitle}>TOP ACTIVITIES</h1>
          <div className={classes.activBox}>
            {firstFourAct.map((action, idx) => {
              return (
                <div key={idx}>
                  <div className={classes.article}>
                    <h3>{action.name} </h3>
                    <div className={classes.para}>
                      <p>{extractContent(action.types.join(' | '))}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {show && (
            <div className={classes.activBox}>
              {secondFourAct.map((action, idx) => {
                return (
                  <div key={idx}>
                    <div className={classes.article}>
                      <h3>{action.name} </h3>
                      <div className={classes.para}>
                        <p>{extractContent(action.types.join(' | '))}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <button onClick={() => setShow(!show)} className={classes.showBtn}>
            Show {show ? "less" : "more"}{" "}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Activities;
