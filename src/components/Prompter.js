import React, { Component } from 'react'
import PromptText from './PromptText'
import PrompterControls from './PrompterControls'
import $ from 'jquery'

class Prompter extends Component {
  constructor() {
    super()
    this.state = {
      isScrolling: false,
      scrollSpeed: 10,
      promptText: `Cras non ligula at turpis fringilla consectetur id in nisi. Fusce nisi magna, dignissim id nibh consequat, sagittis porta felis. Vestibulum lacus sem, venenatis vitae pellentesque bibendum, tempus ac ligula. Donec libero dolor, posuere eu ullamcorper vel, gravida imperdiet odio. Phasellus interdum justo eget bibendum rutrum. Ut blandit, ligula non condimentum blandit, elit neque hendrerit tellus, ac luctus odio elit eget enim. Vestibulum nisl est, pharetra quis lacinia quis, elementum vel ex. Sed suscipit, erat ut pretium venenatis, odio lectus placerat ligula, in consequat leo sapien ut justo. Curabitur porttitor justo sapien, eu ornare purus finibus eget. Ut interdum egestas.`
    }
    this.scrollInterval = () => undefined
    this.scrollPrompter = this.scrollPrompter.bind(this)
    this.handleFlip = this.handleFlip.bind(this)
    this.pauseScroll = this.pauseScroll.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    document.getElementById('prompt-container').addEventListener('keydown', (e) => this.handleKeyDown(e), false)
    document.getElementById('prompt-container').addEventListener('keyup', (e) => this.handleKeyUp(e), false)
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
