import React, { useState } from "react";
import classes from "./Activities.module.css";

export default function Activities({ activ }) {
  

  //setting for show/hidden articles
  const [show, setShow] = useState(false);
  const firstFourAct = activ.slice(0, 4);
  const secondFourAct = activ.slice(4);

  //function use to clear all html tags includes in description from api
  function extractContent(html) {
    return new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent;
  }

  return (
    <div>
      <h1 className={classes.topTitle}>TOP ACTIVITIES</h1>
      <div className={classes.activBox}>
        {firstFourAct.map((action, idx) => {
          return (
            <div key={idx}>
              <div className={classes.article}>
                <img src={action.pictures[0]} alt="activities images" />
                <h3>{action.name} </h3>
                <div className={classes.para}>
                  <p>{extractContent(action.shortDescription)} </p>
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
                  <img src={action.pictures[0]} alt="activities images" />
                  <h3>{action.name} </h3>
                  <div className={classes.para}>
                    <p>{extractContent(action.shortDescription)}</p>
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
  );
}
