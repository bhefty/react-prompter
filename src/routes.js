import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import AuthService from './utils/AuthService'

import App from './components/App'
import Container from './Container'
import NotFound from './components/NotFound'
import Login from './components/Login/Login'

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN)

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

function search(query, cb) {
  return fetch('scripts', {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    console.log(error)
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

search('all', (result) => {
  // console.log(result)
})

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Container} auth={auth}>
      <IndexRedirect to='/home' />
      <Route path='home' component={App} onEnter={requireAuth} />
      <Route path='login' component={Login} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routes
