import React from 'react';
import { Route, Routes, NavLink, Outlet } from 'react-router-dom';
/* import classes from './Nav.module.css'; */
import Home from '../routes/home/home'
import About from '../routes/about/about'
import Deals from '../routes/deals/deals'
const Nav = () => {
  return (
    <div>
      <nav>
        <NavLink to='home'>Home</NavLink>
        <NavLink to='about'>About</NavLink>
        <NavLink to='deals'>Deals</NavLink>
      </nav>
      <Routes>
        <Route path='home' element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='deals' element={<Deals/>}/>
      </Routes>
      <Outlet/>
    </div>
  );
};

export default Nav;