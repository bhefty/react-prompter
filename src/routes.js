import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import { isLoggedIn } from './actions/actions'

import Container from './Container'
import NotFound from './containers/NotFound'
import Login from './containers/Login'
import Demo from './containers/Demo'
import Home from './containers/Home'

const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({ pathname: '/login' })
  }
}

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Container}>
      <IndexRedirect to='/home' />
      <Route path='home' component={Home} onEnter={requireAuth} />
      <Route path='login' component={Login} />
      <Route path='demo' component={Demo} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routes
