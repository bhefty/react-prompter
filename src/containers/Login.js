import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

import LoginView from '../components/LoginView'

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleRoute = this.handleRoute.bind(this)
  }

  handleRoute(route) {
    this.context.router.push(route)
  }

  handleLogin() {
    let { dispatch } = this.props
    dispatch(actions.login())
  }

  handleLogout() {
    let { dispatch } = this.props
    dispatch(actions.logout())
  }

  render() {
    return(
      <LoginView auth={this.props.isAuthenticated} changeRoute={this.handleRoute} login={this.handleLogin} logout={this.handleLogout} />
    )
  }
}

Login.contextTypes = {
  router: T.object
}

const mapStateToProps = (state) => {
  const { auth } = state
  const { isAuthenticated } = auth
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(Login)
