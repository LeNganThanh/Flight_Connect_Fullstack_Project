import React, { useContext } from 'react';
import {  NavLink, Outlet } from 'react-router-dom';
 import classes from './Nav.module.css'; 
 import { FlightsContext } from '../context/FlightsContext';


const Nav = () => {
  const [state] = useContext(FlightsContext)
  console.log(state);

  return (
    <div className={classes.nav}>
      <nav>
        <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.anchor}` )}   to='/'>Deals</NavLink>
        <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.anchor}` )} to='about'>About</NavLink>
        {state.offers && state.offers !== undefined ? <NavLink  className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.anchor}` )}  to='flights'>Flights</NavLink> : null}
      </nav>
    
      <Outlet className={classes.outlet}/>
    </div>
  );
};

export default Nav;
