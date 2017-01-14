import React, { Component } from 'react'
import Prompter from '../containers/Prompter'

class ShowPrompter extends Component {
  render() {
    return (
      <div className='ShowPrompter'>
        <Prompter text={this.props.promptText} />
      </div>
    )
  }
}

export default ShowPrompter
