import React, { Fragment } from 'react';
import Header from '../../components/Header.js'
import FlightsForm from './FlightsForm.js'
import classes from './Flights.module.css';
import video from '../../media/video-2.mp4';
const Flights = (props) => {
  return (
    <Fragment>
    <Header />
      <div className={classes['main-display']}>
        <header className={classes['header-txt']}>
          <h1 className={classes['header-txt-header']}>The best flight deals to <span>everywhere</span>, from <span>anywhere</span></h1>
          <FlightsForm search={props.search} setSearch={props.setSearch} dataSource={props.dataSource}  />
        </header>
        <video  autoPlay muted>
        
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </Fragment>
  );
};

export default Flights;
