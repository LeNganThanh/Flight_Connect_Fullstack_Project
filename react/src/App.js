import React from 'react';
import Header from './components/Header';
import Flights from './routes/flights/Flights.js';
import About from './routes/about/about.js';
import Deals from './routes/deals/deals.js';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Routes>
          <Route path="flights" element={<Flights />} />
          <Route path="about" element={<About />} />
          <Route path="deals" element={<Deals />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
