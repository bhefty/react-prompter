import React, { Component } from 'react'

import HomeView from '../components/HomeView'
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
    return (
      <HomeView testApi={this.handleClick} promptText={this.state.promptText} />
    )
  }
}

export default Home
