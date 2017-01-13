import React, { Component } from 'react'
import TextInput from './TextInput'
import Prompter from './Prompter'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promptText: ''
    }
    this.handleNewData = this.handleNewData.bind(this)
  }

  handleNewData(data) {
    this.setState({ promptText: data })
  }
  
  render() {
    let renderView
    if (this.state.promptText.length === 0) {
      renderView = (<TextInput onNewData={this.handleNewData} />)
    } else {
      renderView = (<Prompter text={this.state.promptText}/>)
    }
    return (
      <div className='Demo'>
        {renderView}
      </div>
    )
  }
}

export default Demo
