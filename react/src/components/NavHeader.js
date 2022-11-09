import React from 'react';
import {  NavLink, Outlet } from 'react-router-dom';
 import classes from './Nav.module.css'; 

const Nav = () => {

  return (
    <div className={classes.nav}>
      <nav>
       
        <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.anchor}` )}   to='/'>Deals</NavLink>
        <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.anchor}` )} to='about'>About</NavLink>
      </nav>
    
      <Outlet/>
    </div>
  );
};

export default Nav;