import React from 'react';
import classes from './Footer.module.css';
import logo from '../media/logo-white.png';

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.header}>
        <img src={logo} alt="logo" />
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.contact}>
          <h3>Contact Us</h3>
          <h4>Email:</h4>
          <li>support@flight-connect.com</li>
          <h4>address:</h4>
          <ul>
            <li>Millerntorplatz 1</li>
            <li>20359 Hamburg</li>
            <li>+49 40 31791606</li>
          </ul>
        </div>
        <div className={classes.explore}>
          <h3>Explore</h3>
          <ul>
            <li>
              <a
                href="https://www.skyscanner.de/de/en-us/eur/flights/domestic-country-flights/de/cheap-domestic-flights-in-germany"
                id="domestic-country-flights"
              >
                Domestic flights
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.de/de/en-us/eur/sitemaps/flights-all-cities"
                id="city-links"
              >
                Cities
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.de/de/en-us/eur/sitemaps/flights-all-airports"
                id="flights-airports"
              >
                Airports
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.de/de/en-us/eur/sitemaps/flights-all-countries"
                id="countries"
              >
                Countries
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.de/de/en-us/eur/hotels"
                id="hotels-home"
              >
                Hotels Deals in Popular Cities
              </a>
            </li>
            <li>
              <a
                href="https://www.skyscanner.de/de/en-us/eur/car-rental"
                id="car-hire-home"
              >
                Car rental
              </a>
            </li>
          </ul>
        </div>
        <div className={classes.partners}>
          <h3>Partners</h3>
          <ul>
            <li>
              <a
                href="https://www.partners.skyscanner.net/?preferences=62a7eec62ab249128b93198b452ede1d&amp;traveller_context=62a7eec6-2ab2-4912-8b93-198b452ede1d&amp;_ga=2.48180775.1220364812.1671027937-180737642.1668082780"
                id="work-with-us"
              >
                Work with us
              </a>
            </li>
            <li>
              <a
                href="https://www.partners.skyscanner.net/advertising/advertise-with-skyscanner?preferences=62a7eec62ab249128b93198b452ede1d&amp;traveller_context=62a7eec6-2ab2-4912-8b93-198b452ede1d&amp;_ga=2.48180775.1220364812.1671027937-180737642.1668082780"
                id="advertising"
              >
                Advertise with us
              </a>
            </li>
            <li>
              <a
                href="https://www.partners.skyscanner.net/insights/travel-insight?preferences=62a7eec62ab249128b93198b452ede1d&amp;traveller_context=62a7eec6-2ab2-4912-8b93-198b452ede1d&amp;_ga=2.48164775.1220364812.1671027937-180737642.1668082780"
                id="travel-insight"
              >
                Travel Insight
              </a>
            </li>
            <li>
              <a
                href="https://www.partners.skyscanner.net/affiliates/affiliate-products?preferences=62a7eec62ab249128b93198b452ede1d&amp;traveller_context=62a7eec6-2ab2-4912-8b93-198b452ede1d&amp;_ga=2.48164775.1220364812.1671027937-180737642.1668082780"
                id="affiliates"
              >
                Affiliates
              </a>
            </li>
            <li>
              <a
                href="https://www.partners.skyscanner.net/affiliates/travel-apis?preferences=62a7eec62ab249128b93198b452ede1d&amp;traveller_context=62a7eec6-2ab2-4912-8b93-198b452ede1d&amp;_ga=2.48164775.1220364812.1671027937-180737642.1668082780"
                id="api"
              >
                Travel APIs
              </a>
            </li>
          </ul>
        </div>
        <div className={classes.company}>
          <h3>Help</h3>
          <ul>
            <li>
              <a
                href="/privacy-settings"
                target="_blank"
                rel="nofollow"
                id="ss-footer-links-privacy-settings"
              >
                Privacy settings
              </a>
            </li>
            <li>
              <a
                href="/security"
                target="_blank"
                id="ss-footer-links-security-page"
              >
                Security
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
