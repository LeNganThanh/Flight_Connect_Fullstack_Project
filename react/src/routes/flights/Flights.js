
import React, { Fragment} from 'react';
import Header from '../../components/Header.js'
import FlightsForm from './FlightsForm.js'
import classes from './Flights.module.css';
import video from '../../media/video-2.mp4';
const Flights = (props) => {

  const {scrollToggle} = props

  return (
    <Fragment>
      <Header scrollToggle={scrollToggle} />
      <div className={`${classes['main-display']} ${scrollToggle ? classes.scrollMain : ''}`}>
      <h1 className= {`${classes['header-txt-header']} ${scrollToggle ? classes.scrollHeaderText : ''}`}>The best flight deals to <span>everywhere</span>, from <span>anywhere</span></h1>
        <header className={`${classes['header-txt']} ${scrollToggle ? classes.scrollHeader : ''}`}>
        <FlightsForm scrollToggle={scrollToggle} search={props.search} setSearch={props.setSearch} dataSource={props.dataSource}  />
        </header>
        <video className={scrollToggle ? classes.scrollVideo : ''} autoPlay muted>

          <source src={video} type="video/mp4" />
        </video>
      </div>
    </Fragment>
  );
};

export default Flights;
