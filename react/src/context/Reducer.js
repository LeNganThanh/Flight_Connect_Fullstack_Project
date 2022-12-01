
export const initialGeoState = {
  latitude: '',
  longitude: '',
  offers: {}
}

export const geoReducer = function(state, action) {
  switch (action.type) {
    case 'setLocation': {
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      }
    }
    case 'setOffers': {
      return {
        ...state,
        offers: action.offers
      }
    }
  }
}

