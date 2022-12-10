import axios from 'axios';

export const getSearchData = params =>{
    const {originCode, destinationCode, dateOfDeparture, dateOfReturn, adults, children} = params;

    const out = axios.get(`http://localhost:1338/api/offers/?originCode=${originCode}&destinationCode=${destinationCode}&dateOfDeparture=${dateOfDeparture}&dateOfReturn=${dateOfReturn}&adults=${adults}&children=${children}`)

    return out;
}


