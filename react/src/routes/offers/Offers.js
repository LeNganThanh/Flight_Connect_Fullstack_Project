import React, { useContext, useEffect } from 'react';
import { FlightsContext } from '../../context/FlightsContext';

const Offers = () => {
  const {offers} = useContext(FlightsContext);
  useEffect(() => {
    console.log(offers.data.data);
  }, [offers]);
  return (
    <div>
    
    </div>
  );
};

export default Offers;
