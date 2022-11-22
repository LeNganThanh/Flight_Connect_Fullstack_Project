import React, {useState} from "react";
import { FlightsContext } from "./FlightsContext";


const FlightsProvider = (props)=>{
 const  [offers, setOffers]= useState(false)
return (
    <FlightsContext.Provider value={{offers, setOffers}}>
        {props.children}
    </FlightsContext.Provider>
)
}


export default FlightsProvider;