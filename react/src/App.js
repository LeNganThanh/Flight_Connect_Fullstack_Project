import React from 'react';
import Header from './components/Header';
import About from './routes/about/About.js';
import Deals from './routes/deals/Deals.js';
import SearchRoot from './routes/flights/searchRoot';
import Nav from './components/NavHeader';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <SearchRoot/>
       
        <Nav />
        <Routes>
          <Route path="/" element={<Deals />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
