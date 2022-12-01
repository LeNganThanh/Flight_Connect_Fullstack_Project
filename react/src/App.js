import React from "react";
import Header from "./components/Header";
import About from "./routes/about/About.js";
import Deals from "./routes/deals/Deals.js";
import SearchRoot from "./routes/flights/searchRoot";
import Nav from "./components/NavHeader";
import { Route, Routes } from "react-router-dom";
import FlightsContextProvider from "./context/FlightsContextProvider";
import Offers from "./routes/offers/Offers.js";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <FlightsContextProvider>
          <SearchRoot />

          <Nav />
          <Routes>
            <Route path="/" element={<Deals />} />
            <Route path="about" element={<About />} />
            <Route path="flights" element={<Offers />} />
          </Routes>
        </FlightsContextProvider>
      </div>
    </div>
  );
}

export default App;
