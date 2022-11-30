import React from 'react';
import classes from './Deals.module.css';
import Tours from '../tours/Tours.js'
const Deals = () => {
  return (
    
    <div className={classes['info-box']}>
      <div className={classes.box}>
        <div><img src='https://content.skyscnr.com/m/139a24f17c26c197/original/p1.svg' alt='earth'/></div>
        <div>Explore the best flight deals from anywhere to everywhere, then book with no fees</div>
      </div>
      <div className={classes.box}>
        <div><img src='https://content.skyscnr.com/m/fb0225dc3a121a8/original/p2.svg' alt='flights'/></div>
        <div>Compare flight deals from over 1,000 providers, and choose the cheapest, fastest or greenest tickets.</div>
      </div>
      <div className={classes.box}>
        <div><img src='https://content.skyscnr.com/m/1993238bdcb0895f/original/p3.svg' alt='deals'/></div>
        <div>Find the cheapest month – or even day – to fly, and set up Price Alerts to book when the price is right
</div>
      </div>

      <Tours/>
    </div>
  );
};

export default Deals;
