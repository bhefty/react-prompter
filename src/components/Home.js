import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import Prompter from './Prompter'
import Prompt from '../api'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      promptText: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    Prompt.fetchAllScripts((script) => {
      this.setState({promptText: script[1].text})
    })
  }

  render() {
    let renderView
    if (this.state.promptText.length === 0) {
      renderView = (
        <div>
          <h1>Home</h1>
          <Button onClick={this.handleClick}>
            Run default script.
          </Button>
        </div>
      )
    } else {
      renderView = (<Prompter text={this.state.promptText} />)
    }
    return (
      <div className='Home'>
        {renderView}
      </div>
    )
  }
}

export default Home
