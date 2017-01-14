import React from 'react'

export default function DemoView(props) {
  let { view } = props

  return (
    <div className='Demo'>
      {view}
    </div>
  )
}
