import React from 'react';
import classes from './Footer.module.css';
import logo from '../media/logo-white.png';

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.header}>
        <h2>Flight Connect</h2>
        <img src={logo} alt="logo" />
      </div>
      <div className={classes.contact}>
        <h3>Contact Us</h3>
        <h4>Email:</h4>
        <p>support@flight-connect.com</p>
        <h4>address:</h4>

        <ul>
          <li>Millerntorplatz 1</li>
          <li>20359 Hamburg</li>
          <li>+49 40 31791606</li>
        </ul>
      </div>
    </div>
  );
}
