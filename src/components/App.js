import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import $ from 'jquery'

import Navigation from './Navigation'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentScrollTop: 0,
      nextScrollTop: 0,
      isScrolling: false,
      scrollRate: 100,
      reachedMaxScroll: false,
      promptText: `Prompting begin! Nam bibendum sapien at sapien finibus, molestie dapibus augue suscipit. Quisque finibus velit vel dui pulvinar aliquet. Vivamus ex tortor, ultricies ac mi eu, convallis tristique nulla. Pellentesque id sagittis felis. Integer at porta turpis, eu ornare mi. Ut pellentesque interdum justo eu placerat. Sed lectus augue, sollicitudin vel ante et, elementum fringilla nisi. Quisque tristique lorem dolor, at sodales diam commodo a. Nullam in nisl nec ligula scelerisque facilisis.

Sed vulputate orci sollicitudin metus iaculis facilisis. Fusce ullamcorper metus purus, at ullamcorper nisi lacinia vulputate. Etiam a sapien tristique, rhoncus ex rutrum, commodo tellus. Nam ipsum est, eleifend ac neque eget, interdum tempor augue. Morbi non justo a dolor eleifend aliquam. Aliquam molestie sem vel aliquet molestie. Quisque facilisis ullamcorper odio, vel porta est blandit nec. Cras ac leo sit amet urna porttitor pharetra. Suspendisse commodo interdum justo, vel viverra ligula egestas at. Maecenas et dolor ac lectus cursus varius ac sit amet libero. Nam ac condimentum enim. Nam odio metus, dictum vitae diam at, egestas dignissim nibh. Sed nec molestie sem, quis mattis nunc. In pretium facilisis ex, ac dictum nulla pellentesque a.

Nunc in scelerisque metus. Nunc ultricies, mi laoreet malesuada tempus, velit quam euismod velit, vel hendrerit quam turpis id nulla. Aliquam a nisi eget sapien ornare blandit. Donec nec est vel augue placerat viverra. Fusce diam nisi, posuere at lectus in, pellentesque gravida elit. In at mi ultrices, aliquam augue vel, efficitur dolor. In a consectetur erat. Donec et mi sed lacus porta aliquet eu vitae urna. Pellentesque in elementum nunc. Integer sollicitudin tempus semper. Suspendisse a eros urna.`
    }
    this.scrollInterval = () => undefined
    this.handleFlip = this.handleFlip.bind(this)
    this.scrollDiv = this.scrollDiv.bind(this)
    this.pauseScroll = this.pauseScroll.bind(this)
  }
  handleFlip() {
    let promptDiv = document.getElementById('prompt-container')
    promptDiv.classList.toggle('prompt-flip-text')
  }

  pauseScroll() {
    clearInterval(this.scrollInterval)
    this.setState({ isScrolling: false })
  }

  scrollDiv() {
    if(!this.state.isScrolling) {
      let promptDiv = document.getElementById('prompt-container')
      // let newScrollTop = (this.state.currentScrollTop > this.state.nextScrollTop) ? this.state.currentScrollTop : this.state.nextScrollTop
      let newScrollTop = this.state.nextScrollTop
      let newReachedMaxScroll
      this.scrollInterval = setInterval(() => {
        this.setState({ isScrolling: true })
        $(promptDiv).animate({ scrollTop: newScrollTop }, 50, 'linear')
        newScrollTop += 5
        newReachedMaxScroll = promptDiv.scrollTop >= (promptDiv.scrollHeight - promptDiv.offsetHeight)
        this.setState({ currentScrollTop: newScrollTop })
        if (newReachedMaxScroll === true) {
          this.setState({
            reachedMaxScroll: newReachedMaxScroll,
            currentScrollTop: 0
          })
          this.pauseScroll()
        }
      }, this.state.scrollRate)
    } else {
      this.pauseScroll()
    }
  }

  render() {
    return (
      <div className='prompt-parent'>
        <Navigation />

        <div id='prompt-container' className='prompt-container' onScroll={() => {
          let promptDiv = document.getElementById('prompt-container')
          console.log('scrollTop', promptDiv.scrollTop)
          this.setState({ nextScrollTop: promptDiv.scrollTop })
        }}>

            {this.state.promptText}
            ---END---

        </div>

        <div>
          <Button
            bsStyle="primary"
            onClick={this.handleFlip}>
              Mirror Text
          </Button>
          <Button onClick={() => {
            this.scrollDiv()
          }}>Scroll</Button>
        </div>
      </div>
    );
  }
}

export default App;
