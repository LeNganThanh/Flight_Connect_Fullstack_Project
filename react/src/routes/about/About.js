import React from 'react';
import classes from './About.module.css';
import logo from '../../media/logo-5.png';
import Footer from '../../components/Footer';

const About = () => {
  return (
    <div>
      <div className={classes.travel}>
        <div>
          <h2>Travel your way</h2>
        </div>
        <div className={classes.travelTxt}>
          <p>
            When we started in 2003, we set out to do things differently. We
            wanted to show all flight options in one place, creating a simple
            alternative to the confusing sites that make travel feel like hard
            work.
          </p>
          <p>
            Fast forward to today and we’/ve gone from a flight search engine to
            a global leader in travel. We're proud that more than 100 million
            people across the world (that's quite a few!) rely on our app and
            website each month to help them with their travel plans.
          </p>
          <p>
            Dedicated to making travel as simple as possible, we help each and
            every one of them find the best options across flights, hotels, and
            car rentals to book the perfect trip.
          </p>
        </div>
      </div>
      <div className={classes.logoBox}>
        <div>
          <h2>
            It’s our mission to lead the global transformation to modern and
            sustainable travel.
          </h2>
        </div>
        <img src={logo} alt="logo" />
      </div>
      <div className={classes.modernTravel}>
        <div>
          <h2>What we mean by modern travel</h2>
          <img
            src="https://content.skyscnr.com/m/7e7bc1d67ce2a552/original/illustration-modern-travel.svg"
            alt="woman on the way"
          />
        </div>

        <div className={classes.modernTravelTxt}>
          <p>
            Travel is all about freedom. So it makes sense that planning and
            booking your trip should be simple, not a chore.
          </p>
          <p>
            We know you're looking for the best prices and most flexibility, to
            choose what's right for you. Which is why we're always hard at work
            to make sure our app and website are super straightforward and
            efficient.
          </p>
          <p>
            Choose where you want to go, when you want to go, and get the very
            best price from thousands of sites, without having to look anywhere
            else. Plus, check out all the ways we can help you find a trip
            that's tailored to what you’re looking for, no matter your travel
            style or your budget.
          </p>
          <p>
            Feeling flexible? Search ‘Everywhere’ to see where you can go for a
            great price. Got a destination in mind? Use our Price Alerts to find
            out when prices change.
          </p>
          <p>
            And once you know when and where you’re going, book in just a few
            quick steps, whether on our app or website -- both of which are
            available in more than 30 languages.
          </p>
        </div>
      </div>
      <div className={classes.modernTravel}>
        <div>
          <h2>What we mean by sustainable travel</h2>
          <img
            src="https://content.skyscnr.com/m/1330f2c70f1ea3a6/original/illustration-sustainable-travel.svg"
            alt="woman on the way"
          />
        </div>

        <div className={classes.modernTravelTxt}>
          <p>
            Travel is one of life's greatest pleasures. And we want each
            generation to be able to experience that joy.
          </p>
          <p>
            We give you all the options so that you can make the decision that’s
            right for you. That includes our 'Greener choice' label, which
            highlights the flights that emit less CO2 and we’ve already helped
            more than 10 million travelers select flights with the lowest
            emissions for their route.
          </p>
          <p>
            It’s just the start, but we’re serious about sustainability and
            holding ourselves accountable. We buy sustainable aviation fuel
            (SAF) to help offset any travel we do here at Skyscanner. We're a
            team that's committed to discovering new ways to explore the world
            in a way that benefits both people and places.
          </p>
          <p>
            We also know we can’t solve this challenge alone. That's why we’re
            working with the Duke of Sussex and industry leaders, to form
            Travalyst. Together, we’re a catalyst for change, committed to
            helping everyone explore our world for generations to come.
          </p>
        </div>
      </div>
      <div className={classes.dealsMain}>
        <div className={classes.dealsTxt}>
          <h2>Looking for the best flight deals to anywhere in the world?</h2>
          <p>
            It’s easy around here. 100 million travelers use us as their go-to
            tool, comparing flight deals and offers from more than 1,200
            airlines and travel providers. With so many options to choose from
            in one place, you can say hello to savings and goodbye to stress –
            here’s how.
          </p>
        </div>
        <div className={classes.dealsBox}>
          <div>
            <img
              src="https://content.skyscnr.com/m/3e55723dcc8a2d0f/original/image1.svg"
              alt="world"
            />
            <h3>Search Everywhere explore anywhere</h3>
            <p>
              Enter your departure airport and travel dates, then hit
              Everywhere. You'/ll see flights to every destination in the world,
              cheapest first.
            </p>
          </div>
          <div>
            <img
              src="https://content.skyscnr.com/m/7b7b3eaf2ab4081c/original/image2.svg"
              alt="offer"
            />
            <h3>Pay less, go further with transparent pricing</h3>
            <p>
              The cheapest flight deals. No hidden fees. No funny business. With
              us, the price you see when you search is what you’/ll pay.
            </p>
          </div>
          <div>
            <img
              src="https://content.skyscnr.com/m/4ab58b7e3ae3790c/original/image3.svg"
              alt="clock"
            />
            <h3>Book when it's best with Price Alerts</h3>
            <p>
              Found your flight, but not quite ready to book? Set up Price
              Alerts and we’ll let you know when your flight price goes up or
              down.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
        
     
    </div>
  );
};

export default About;
