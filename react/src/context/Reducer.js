
export const initialGeoState = {
  latitude: '',
  longitude: '',
  offers: false,
  activities: {},
  deals: false
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
    case 'setActivities': {
      return {
        ...state,
        activities: action.activities
      }
    }
    case 'setDeals': {
      return {
        ...state,
        deals: action.deals
      }
    }
    default: {
      return {
        ...state
      }
    }
    }
}

