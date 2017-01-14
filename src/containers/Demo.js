import React, { Component } from 'react'

import DemoView from '../components/DemoView'
import TextInput from '../components/TextInput'
import Prompter from '../containers/Prompter'

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
      <DemoView view={renderView} />
    )
  }
}

export default Demo
