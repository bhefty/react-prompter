import React from 'react'

export default function PromptText(props) {
  let { onScrollPrompter, text } = props
  return (
    <textarea readOnly id='prompt-container' className='prompt-container noselect'
      onClick={() => {
        onScrollPrompter('forward')
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        onScrollPrompter('backward')
      }} value={text}/>
  )
}
