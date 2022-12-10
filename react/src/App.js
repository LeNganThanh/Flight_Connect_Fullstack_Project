import React, {useState} from "react";
import About from "./routes/about/About.js";
import Deals from "./routes/deals/Deals.js";
import Bookmarks from "./components/Bookmarks.js";
import SearchRoot from "./routes/flights/searchRoot";
import Nav from "./components/NavHeader";
import { Route, Routes } from "react-router-dom";
import FlightsContextProvider from "./context/FlightsContextProvider";
import Offers from "./routes/offers/Offers.js";

function App() {
  const [scrollToggle, setScrollToggle] = useState(false)
  
  const changeCss = () => {
    if(window.scrollY >= 320) {
      setScrollToggle(true)
    } else {
      setScrollToggle(false)
    }
  }
  window.addEventListener('scroll', changeCss)

  return (
    <div className="App">
      <div>
        <FlightsContextProvider>
          <SearchRoot scrollToggle={scrollToggle} />
          <Nav scrollToggle={scrollToggle} />
          <Routes>
            <Route path="/" element={<Deals />} />
            <Route path="about" element={<About />} />
            <Route path="bookmarks" element={<Bookmarks/>}/>
            <Route path="flights" element={<Offers />} />
          </Routes>
        </FlightsContextProvider>
      </div>
    </div>
  );
}

export default App;
