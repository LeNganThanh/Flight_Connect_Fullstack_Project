import React from 'react';
import {  NavLink, Outlet } from 'react-router-dom';
 import classes from './Nav.module.css'; 

const Nav = () => {
  return (
    <div className={classes.nav}>
      <nav>
        <NavLink to='home'>Home</NavLink>
        <NavLink to='about'>About</NavLink>
        <NavLink to='deals'>Deals</NavLink>
      </nav>
    
      <Outlet/>
    </div>
  );
};

export default Nav;