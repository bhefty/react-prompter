import React, { Component } from 'react'
import PromptText from './PromptText'
import PrompterControls from './PrompterControls'
import $ from 'jquery'

class Prompter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isScrolling: false,
      scrollSpeed: 10,
      promptText: this.props.text
    }
    this.scrollInterval = () => undefined
    this.scrollPrompter = this.scrollPrompter.bind(this)
    this.handleFlip = this.handleFlip.bind(this)
    this.pauseScroll = this.pauseScroll.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.setText = this.setText.bind(this)
    this.resetText = this.resetText.bind(this)
  }

  componentDidMount() {
    document.getElementById('prompt-container').addEventListener('keydown', (e) => this.handleKeyDown(e), false)
    document.getElementById('prompt-container').addEventListener('keyup', (e) => this.handleKeyUp(e), false)
    this.setText(this.props.text)
  }

  componentWillUnmount() {
    this.resetText()
  }

  setText(text) {
    this.setState({promptText: text})
  }

  resetText() {
    this.setState({promptText: ''})
  }

  componentDidUnMount() {
    this.setState({promptText: ''})
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

  pauseScroll() {
    clearInterval(this.scrollInterval)
    this.setState({ isScrolling: false })
  }

  handleFlip() {
    let promptDiv = document.getElementById('prompt-container')
    promptDiv.classList.toggle('prompt-flip-text')
  }

  render() {
    return (
      <div className='Prompter'>
        <PromptText onScrollPrompter={this.scrollPrompter} text={this.state.promptText}/>
        <PrompterControls onScrollPrompter={this.scrollPrompter} onFlip={this.handleFlip}/>
      </div>
    )
  }
}

export default Prompter
