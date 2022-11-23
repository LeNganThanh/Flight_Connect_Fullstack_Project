import axios from 'axios';

export const getSearchData = params =>{
    const {originCode, destinationCode, dateOfDeparture, dateOfReturn} = params;

    const out = axios.get(`http://localhost:1338/api/offers/?originCode=${originCode}&destinationCode=${destinationCode}&dateOfDeparture=${dateOfDeparture}&dateOfReturn=${dateOfReturn}`)

    return out;
}


