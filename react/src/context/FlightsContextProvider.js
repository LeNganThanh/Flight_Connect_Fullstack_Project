import React, {useReducer} from "react";
import { FlightsContext } from "./FlightsContext";
import {initialGeoState, geoReducer} from './Reducer';


function FlightsContextProvider({children}) {

const [state, dispatch] = useReducer(geoReducer, initialGeoState);


return (
    <FlightsContext.Provider value={[state, dispatch]}>
        {children}


    </FlightsContext.Provider>
)

}


export default FlightsContextProvider;
