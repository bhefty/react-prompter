import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

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
    let { dispatch } = this.props
    dispatch(actions.login())
  }

  render() {
    console.log('props', this.props)
    return(
      <LoginView changeRoute={this.handleRoute} login={this.handleLogin} />
    )
  }
}

Login.contextTypes = {
  router: T.object
}

export default connect()(Login)
