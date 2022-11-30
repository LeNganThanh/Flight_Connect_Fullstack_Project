import React from 'react';
import App from './App.js';
import reactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom';


reactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
