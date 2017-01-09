import React, { Component } from 'react'

class PromptText extends Component {
  render() {
    return (
      <textarea readOnly id='prompt-container' className='prompt-container noselect'
        onClick={() => {
          this.props.onScrollPrompter('forward')
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          this.props.onScrollPrompter('backward')
        }} value={this.props.text}/>
    )
  }
}

export default PromptText
