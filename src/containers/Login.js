import React, { Component, PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'
import LoginView from '../components/LoginView'

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRoute = this.handleRoute.bind(this)
  }

  handleRoute(route) {
    this.context.router.push(route)
  }

  handleLogin() {
    this.props.auth.login()
  }

  render() {
    return(
      <LoginView changeRoute={this.handleRoute} login={this.handleLogin} />
    )
  }
}

Login.contextTypes = {
  router: T.object
}

Login.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
}

export default Login
