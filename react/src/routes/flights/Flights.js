import React, { Fragment } from 'react';
import FlightsForm from './FlightsForm.js'
import classes from './Flights.module.css';
import video from '../../media/video-2.mp4';
const Flights = (props) => {
  return (
    <Fragment>
      <div className={classes.main}>
        <header className={classes['header-txt']}>
          <h1>The best flight deals to everywhere, from anywhere</h1>
          <FlightsForm search={props.search} setSearch={props.setSearch} dataSource={props.dataSource}  />
        </header>
        
        <div className={classes['main-display']}>
       
          <video  autoPlay muted>
          
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </Fragment>
  );
};

export default Flights;
