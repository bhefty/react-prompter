import React from 'react'
import { Button } from 'react-bootstrap'


export default function LoginView(props) {
  let { auth, changeRoute, login, logout } = props
  let authButton
  if (auth) {
    authButton = (
      <Button bsStyle='danger'
        bsSize='large'
        block
        onClick={logout}>
        Logout
      </Button>
    )
  } else {
    authButton = (
      <Button bsStyle='success'
        bsSize='large'
        block
        onClick={login}>
        Login
      </Button>
    )
  }
  return (
    <div className='Login'>
      <h1>Choose an option:</h1>
        <div className='well'>
        <Button bsStyle='primary'
          bsSize='large'
          block
          onClick={() => changeRoute('/demo')}>
          Quick Start - Demo
        </Button>
        {authButton}
      </div>
    </div>
  )
}
