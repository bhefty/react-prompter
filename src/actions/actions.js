import Auth0Lock from 'auth0-lock'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
  auth: {
    redirectUrl: `${window.location.origin}/login`,
    responseType: 'token',
    params: {
      state: JSON.stringify({pathname: window.location.pathname})
    }
  }
})

export const loginSuccess = (profile) => {
  console.log('success', profile)
  return {
    type: LOGIN_SUCCESS,
    profile
  }
}

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    error
  }
}

let getAccessToken = () => {
  let token = localStorage.getItem('accessToken')
  return !!token
}

export const isLoggedIn = () => {
  return getAccessToken()
}

// export const getUsers = () => {
//   return {
//     type: 'FETCH_USER',
//     payload: {
//       name: 'Bill',
//       age: 27
//     }
//   }
// }

export const login = () => {
  // display lock widget
  return dispatch => {
    lock.show()
  }
}

export const logoutSuccess = (profile) => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('idToken')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('profile')
    return dispatch(logoutSuccess())
  }
}

// Listen to authenticated event to get profile of user
export const doAuthentication = (router) => {
  return dispatch => {

    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return dispatch(loginError(error))
        }
        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('accessToken', authResult.accessToken)
        localStorage.setItem('idToken', authResult.idToken)
        router.replace('/home')
        return dispatch(loginSuccess(profile))
      })
    })
  }
}
