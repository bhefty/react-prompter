import React from 'react'
import Prompt from '../api'
import ScriptItem from './ScriptItem'

export default function Scripts() {
  let scriptList = Prompt.fetchAllScripts('Id001', (scripts) => {
    // return scripts.map((script) => {
    //   return (<li>{script.text}</li>)
    // })
    console.log('done?')
  })
  return (
    <div className='Scripts'>
      <h1>Scripts</h1>
      <ScriptItem script={scriptList} />
    </div>
  )
}
