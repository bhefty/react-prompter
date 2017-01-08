import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import AuthService from './utils/AuthService'

// import App from './components/App'
import Container from './Container'
import Home from './components/Home/Home'
import Login from './components/Login/Login'

const auth = new AuthService('vTXrv6wu2uoMG7pWIYJlfn5XwAkeKDFE', 'bhefty.auth0.com')

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Container} auth={auth}>
      <IndexRedirect to='/home' />
      <Route path='home' component={Home} onEnter={requireAuth} />
      <Route path='login' component={Login} />
    </Route>
  </Router>
)

export default Routes
