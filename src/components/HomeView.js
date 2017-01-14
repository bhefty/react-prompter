import React from 'react'
import { Button } from 'react-bootstrap'

import Prompter from '../containers/Prompter'

export default function HomeView(props) {
  let { testApi, promptText } = props
  let renderView
  if (promptText.length === 0) {
    renderView = (
      <div>
        <h1>Home</h1>
        <Button onClick={testApi}>Test API</Button>
      </div>
    )
  } else {
    renderView = (<Prompter text={promptText} />)
  }
  return (
    <div className='Home'>
      {renderView}
    </div>
  )
}
