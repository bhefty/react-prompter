import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class TextInput extends Component {
  constructor(props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault()
    let data = ''
    let promptText = this.refs.promptText.value

    if (promptText.length > 0) {
      data = promptText
      this.refs.promptText.value = ''
    }
    this.props.onNewData(data)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className='form-group'>
          <label>Enter text to scroll below:</label>
          <textarea className='form-control promptTextInput' ref='promptText' type='textarea' placeholder='Enter text here' />
        </div>
        <Button type='submit' bsStyle='primary'>
          Submit
        </Button>
      </form>
    )
  }
}

export default TextInput
