import React, {useState} from "react";
import { FlightsContext } from "./FlightsContext";


const FlightsProvider = (props)=>{
 const  [offers, setOffers]= useState(false)
 const [city, setCity] = useState('')
return (
    <FlightsContext.Provider value={[offers, setOffers, city, setCity]}>
        {props.children}
    </FlightsContext.Provider>
)
}


export default FlightsProvider;