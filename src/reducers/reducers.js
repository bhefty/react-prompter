const defaultUser = {
  user: {
    id: null,
    name: null,
    age: null
  },
  fetching: false,
  fetched: false,
  error: null
}

export let userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload
      }
    default:
      return state
  }
}
