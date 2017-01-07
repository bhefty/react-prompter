import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import $ from 'jquery'

import Navigation from './Navigation'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isScrolling: false,
      scrollSpeed: 10,
      promptText: `Prompting begin! Nam bibendum sapien at sapien finibus, molestie dapibus augue suscipit. Quisque finibus velit vel dui pulvinar aliquet. Vivamus ex tortor, ultricies ac mi eu, convallis tristique nulla. Pellentesque id sagittis felis. Integer at porta turpis, eu ornare mi. Ut pellentesque interdum justo eu placerat. Sed lectus augue, sollicitudin vel ante et, elementum fringilla nisi. Quisque tristique lorem dolor, at sodales diam commodo a. Nullam in nisl nec ligula scelerisque facilisis.

Sed vulputate orci sollicitudin metus iaculis facilisis. Fusce ullamcorper metus purus, at ullamcorper nisi lacinia vulputate. Etiam a sapien tristique, rhoncus ex rutrum, commodo tellus. Nam ipsum est, eleifend ac neque eget, interdum tempor augue. Morbi non justo a dolor eleifend aliquam. Aliquam molestie sem vel aliquet molestie. Quisque facilisis ullamcorper odio, vel porta est blandit nec. Cras ac leo sit amet urna porttitor pharetra. Suspendisse commodo interdum justo, vel viverra ligula egestas at. Maecenas et dolor ac lectus cursus varius ac sit amet libero. Nam ac condimentum enim. Nam odio metus, dictum vitae diam at, egestas dignissim nibh. Sed nec molestie sem, quis mattis nunc. In pretium facilisis ex, ac dictum nulla pellentesque a.

Nunc in scelerisque metus. Nunc ultricies, mi laoreet malesuada tempus, velit quam euismod velit, vel hendrerit quam turpis id nulla. Aliquam a nisi eget sapien ornare blandit. Donec nec est vel augue placerat viverra. Fusce diam nisi, posuere at lectus in, pellentesque gravida elit. In at mi ultrices, aliquam augue vel, efficitur dolor. In a consectetur erat. Donec et mi sed lacus porta aliquet eu vitae urna. Pellentesque in elementum nunc. Integer sollicitudin tempus semper. Suspendisse a eros urna.`
    }
    this.scrollInterval = () => undefined
    this.handleFlip = this.handleFlip.bind(this)
    this.scrollPrompter = this.scrollPrompter.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    document.getElementById('prompt-container').addEventListener('keydown', (e) => this.handleKeyDown(e), false)
    document.getElementById('prompt-container').addEventListener('keyup', (e) => this.handleKeyUp(e), false)
  }

  handleFlip() {
    let promptDiv = document.getElementById('prompt-container')
    promptDiv.classList.toggle('prompt-flip-text')
  }

  pauseScroll() {
    clearInterval(this.scrollInterval)
    this.setState({ isScrolling: false })
  }

  scrollPrompter(direction) {
    let promptDiv = document.getElementById('prompt-container')
    let speed = promptDiv.scrollTop
    if (!this.state.isScrolling) {
      this.setState({isScrolling: true})
      this.scrollInterval = setInterval(() => {
        $('#prompt-container').animate({ scrollTop: speed }, 100, 'linear')
        if (direction === 'forward') speed += this.state.scrollSpeed
        if (direction === 'backward') speed -= this.state.scrollSpeed
        if (
            ((promptDiv.scrollTop >= (promptDiv.scrollHeight - promptDiv.offsetHeight)) && direction === 'forward') ||
            ((promptDiv.scrollTop === 0) && direction === 'backward')
          ) {
            this.pauseScroll()
        }
      }, 100)
    } else {
      this.pauseScroll()
    }
  }

  handleKeyDown(e) {
    e.preventDefault()
    let top = document.getElementById('prompt-container').scrollTop

    switch (e.keyCode) {
      case 38:
        top -= 50
        if (this.state.isScrolling) this.pauseScroll()
        $('#prompt-container').animate({ scrollTop: top }, 80, 'linear')
        break
      case 40:
        top += 50
        if (this.state.isScrolling) this.pauseScroll()
        $('#prompt-container').animate({ scrollTop: top }, 80, 'linear')
        break
      case 32:
        if (this.state.isScrolling) {
          this.pauseScroll()
        } else {
          this.scrollPrompter('forward')
        }
        break
      default:
        break
    }
  }

  handleKeyUp(e) {
    e.preventDefault()

    switch (e.keyCode) {
      case 38:
      case 40:
        this.scrollPrompter('forward')
        break
      default:
        break
    }
  }

  render() {
    return (
      <div className='prompt-parent'>
        <Navigation />

        <textarea readOnly id='prompt-container' className='prompt-container noselect'
          onClick={() => {
            this.scrollPrompter('forward')
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            this.scrollPrompter('backward')
          }} value={this.state.promptText}/>

        <div>
          <Button
            bsStyle="primary"
            onClick={this.handleFlip}>
              Mirror Text
          </Button>
          <Button onClick={() => {
            this.scrollPrompter('forward')
          }}>Scroll</Button>

          <Button onClick={() => {
            this.scrollPrompter('backward')
          }}>Reverse</Button>
        </div>
      </div>
    );
  }
}

export default App;
