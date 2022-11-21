import axios from 'axios';

export const getSearchData = params =>{
    const {originCode, destinationCode, dateOfDeparture} = params;

    const out = axios.get(`http://localhost:1338/api/offers/?originCode=${originCode}&destinationCode=${destinationCode}&dateOfDeparture=${dateOfDeparture}`)

    return out;
}


