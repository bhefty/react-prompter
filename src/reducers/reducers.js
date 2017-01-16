import * as ActionTypes from '../actions/actions'
const jwtDecode = require('jwt-decode')

const checkTokenExpiry = () => {
  let jwt = localStorage.getItem('idToken')
  if (jwt) {
    let jwtExp = jwtDecode(jwt).exp
    let expiryDate = new Date(0)
    expiryDate.setUTCSeconds(jwtExp)

    if (new Date() < expiryDate) {
      return true
    }
    return true
  }
  return false
}

const getProfile = () => {
  return JSON.parse(localStorage.getItem('profile'))
}

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

export const userReducer = (state = defaultUser, action) => {
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

export const authReducer = (state = {
  isAuthenticated: checkTokenExpiry(),
  profile: getProfile(),
  error: ''
  }, action) => {
    switch (action.type) {
      case ActionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          profile: action.profile,
          error: ''
        }
      case ActionTypes.LOGIN_ERROR:
        return {
          ...state,
          isAuthenticated: false,
          profile: null,
          error: action.error
        }
      case ActionTypes.LOGOUT_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          profile: null
        }
      default:
        return state
    }
}
