import React from 'react'
import { Button } from 'react-bootstrap'

export default function TextInput(props) {
  let { onNewData } = props
  let input

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      let data = ''
      let promptText = input.value

      if (promptText.length > 0) {
        data = promptText
        input.value = ''
      }
      onNewData(data)
    }}>
      <div className='form-group'>
        <label>Enter text to scroll below:</label>
        <textarea className='form-control promptTextInput' ref={node => input = node} type='textarea' placeholder='Enter text here' />
      </div>
      <Button type='submit' bsStyle='primary'>
        Submit
      </Button>
    </form>
  )
}
