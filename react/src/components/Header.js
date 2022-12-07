import React, { useState, useContext } from 'react';

import classes from './Header.module.css';
import signUpStyles from './Signup.module.css'
import button from './Button.module.css';
import Button from './Button.js';
import Signup from './Signup.js'
import Login from './Login.js';
import logo from '../media/logo-5.png';
import BurgerMenu from './BurgerMenu';
import Settings from './Settings';
import { FlightsContext } from '../context/FlightsContext';

const Header = () => {
  const [register, setRegister] = useState(false);
 // const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useContext(FlightsContext)
  const [settings, setSettings] = useState(false)

  const toggleRegister = () => {
    setRegister(register => !register);
    if (state.login) {
      dispatch({
        type: 'setLogin',
        login: false
      });
    }
  };
  const toggleLogin = () => {
    dispatch({
      type: 'setLogin',
      login: !state.login
    })
   
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
            <Button className={register ? button.userOn : button.user} onClick={toggleRegister}>
              Sign up
            </Button>
            {' '}
            <Button className={state.login ? button.userOn : button.user} onClick={toggleLogin}>
              Log in
            </Button>
          </div>
        ) : <BurgerMenu className={button.burger} onClick={toggleSettings}/>}

        {!loggedIn ? <Signup className={`${register ? button.registerOn : button.registerOff } ${signUpStyles.signUpForm}`}  setRegister={setRegister}/> : null}

        {!loggedIn ? <Login className= {`${state.login ? button.loginOn : button.loginOff }  ${signUpStyles.signUpForm}`}  setRegister={setRegister} setLoggedIn={setLoggedIn}/> : null}

        {loggedIn ? <Settings className={`${settings ? button.settingsOn : button.settingsOff } ${signUpStyles.signUpForm}`} setSettings= {setSettings} setLoggedIn={setLoggedIn}/> : null}

      </div>
    </div>
  );
};

export default Header;
