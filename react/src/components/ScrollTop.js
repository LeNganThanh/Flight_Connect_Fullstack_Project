import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import classes from './ScrollTop.module.css'

const ScrollTop = () => {

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classes.scrollTop}>
      <button onClick={goToTop}><FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faChevronUp} /></button>
    </div>
  )
}

export default ScrollTop
