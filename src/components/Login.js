import React, { Component, PropTypes as T } from 'react'
import { Button } from 'react-bootstrap'
import AuthService from '../utils/AuthService'

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  render() {
    return(
      <div className='Login'>
        <h1>Choose an option:</h1>
          <div className='well'>
          <Button bsStyle='primary'
            bsSize='large'
            block
            onClick={() => this.context.router.push('/demo')}>
            Quick Start - Demo
          </Button>
          <Button bsStyle='success'
            bsSize='large'
            block
            onClick={this.handleLogin}>
            Login
          </Button>
        </div>
      </div>
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
