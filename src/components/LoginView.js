import React from 'react'
import { Button } from 'react-bootstrap'


export default function LoginView(props) {
  let { changeRoute, login } = props
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
        <Button bsStyle='success'
          bsSize='large'
          block
          onClick={login}>
          Login
        </Button>
      </div>
    </div>
  )
}
