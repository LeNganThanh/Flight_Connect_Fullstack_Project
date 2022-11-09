import React from 'react';
import Header from './components/Header';
import Flights from './routes/flights/Flights.js';
import About from './routes/about/about.js';
import Deals from './routes/deals/Deals.js';
import Nav from './components/NavHeader';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Flights />
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
