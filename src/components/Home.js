import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import Prompter from '../containers/Prompter'
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
    Prompt.fetchAllScripts((user) => {
      // console.log('script', script.scripts[1].text)
      console.log(user)
      this.setState({promptText: user.users[0].scripts[0].text})
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
