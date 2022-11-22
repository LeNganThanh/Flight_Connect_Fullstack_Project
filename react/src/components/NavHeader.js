import React, { useContext } from 'react';
import {  NavLink, Outlet } from 'react-router-dom';
 import classes from './Nav.module.css'; 
 import { FlightsContext } from '../context/FlightsContext';


const Nav = () => {
  const [offers, setOffers] = useContext(FlightsContext)

  return (
    <div className={classes.nav}>
      <nav>
       
        <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.anchor}` )}   to='/'>Deals</NavLink>
        <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.anchor}` )} to='about'>About</NavLink>
        {offers ? <NavLink  className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.anchor}` )}  to='flights'>Flights</NavLink> : null}
      </nav>
    
      <Outlet/>
    </div>
  );
};

export default Nav;