import React, { useContext, useEffect } from 'react';
import { FlightsContext } from '../../context/FlightsContext';

const Offers = () => {
  const [offers] = useContext(FlightsContext);
  useEffect(() => {
    console.log(offers);
  }, [offers]);
  if(offers){
    return (
        <div>
        {offers.data.data.map(offer =>{
            const airlineCode = offer.validatingAirlineCodes[0]
            return(
                <div key={offer.id}>
                    <h2>Total Price: {offer.price.total}€</h2>
                    
                    <img src= {`https://www.skyscanner.net/images/airlines/small/${airlineCode}.png`} alt='airline'/>
                    
                </div>
            )
        })}
        </div>
      );
  }else{
    return(
        <div><h2>Loading takes a life time!</h2></div>
    )
  }
 
};

export default Offers;
