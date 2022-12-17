
export const initialGeoState = {
  latitude: '41.296950',
  longitude: '2.078340',
  cities: [],
  offers: false,
  activities: [],
  deals: false,
  user: false,
  bookmarks: [],
  login: false,
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
    case 'setCities': {
      return {
        ...state,
        cities: action.cities
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
    case 'setUser':{
      return{
        ...state,
        user: action.user
      }
    }case 'setBookmarks':{
      return{
        ...state,
        bookmarks: action.bookmark
      }
    }case 'deleteBookmark': {
      let copy = state.bookmarks
      copy.splice(action.bookmark, 1)
      return{
        ...state,
        bookmarks: copy
      }
    }case 'setFlights':{
      return{
        ...state,
        flight: action.flight
      }
    }case 'setLogin':{
      return{
        ...state,
        login: action.login,
      }

    }

    default: {
      return {
        ...state
      }
    }
    }
}

