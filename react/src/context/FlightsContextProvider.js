import React, {useReducer} from "react";
import { FlightsContext } from "./FlightsContext";
import {initialGeoState, geoReducer} from './Reducer';

// const initialGeoState = {
//   latitude: '',
//   longitude: '',
//   offers: {}
// }

// const geoReducer = function(geoState, action) {
//   switch (action.type) {
//     case 'setLocation': {
//       return {
//         ...geoState,
//         latitude: action.latitude,
//         longitude: action.longitude
//       }
//     }
//     case 'setOffers': {
//       return {
//         ...geoState,
//         offers: action.offers
//       }
//     }
//   }
// }


function FlightsContextProvider({children}) {

const [state, dispatch] = useReducer(geoReducer, initialGeoState);


const setLocation = (location) => {
  dispatch({
    type: 'setLocation',
    latitude: location.latitude,
    longitude: location.longitude
  })
  }

const setOffers = (offer) => {
  dispatch({
    type: 'setOffers',
    offers: offer
  })
}

return (
    <FlightsContext.Provider value={[state, dispatch]}>
        {children}
    </FlightsContext.Provider>
)

}


export default FlightsContextProvider;
