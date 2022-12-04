import React, { useState } from 'react';

import classes from './Header.module.css';
import signUpStyles from './Signup.module.css'
import button from './Button.module.css';
import Button from './Button.js';
import Signup from './Signup.js'
import Login from './Login.js';
import logo from '../media/logo-5.png';
import BurgerMenu from './BurgerMenu';
import Settings from './Settings';

const Header = () => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [settings, setSettings] = useState(false)

  const toggleRegister = () => {
    setRegister(register => !register);
    if (login) {
      setLogin(login => !login);
    }
  };
  const toggleLogin = e => {
    
    setLogin(login => !login);
    if (register) {
      setRegister(register => !register);
    }
  };

  const toggleSettings = () => {
    setSettings(settings => !settings);
  }

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.headerText}>
          <span>
            <img className={classes['logo-img']} src={logo} alt="logo" />
          </span>
        </div>

        {!loggedIn ? (
          <div className={classes.headerText}>
            <Button className={button.user} onClick={toggleRegister}>
              Signup
            </Button>{' '}
            {/* Need functions */}
            <Button className={button.user} onClick={toggleLogin}>
              Login
            </Button>

          </div>
        ) : <BurgerMenu className={button.burger} onClick={toggleSettings}/>}

        <Signup className={`${register ? button.registerOn : button.registerOff } ${signUpStyles.signUpForm}`}  setLogin={setLogin} setRegister={setRegister}/>
          
        
        <Login className= {`${login ? button.loginOn : button.loginOff }  ${signUpStyles.signUpForm}`}  setLogin={setLogin} setRegister={setRegister} setLoggedIn={setLoggedIn}/>
          
          <Settings className={`${settings ? button.settingsOn : button.settingsOff } ${signUpStyles.signUpForm}`} setSettings= {setSettings} />
        
      </div>
    </div>
  );
};

export default Header;
