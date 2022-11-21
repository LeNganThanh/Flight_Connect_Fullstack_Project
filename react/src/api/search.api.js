import axios from 'axios';

export const getSearchData = params =>{
    console.log(params);
    const {originCode, destinationCode, dateOfDeparture} = params;

    const out = axios.get(`http://localhost:1338/api/offers`)

    return out;
}


