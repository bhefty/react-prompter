import React from 'react'
import { Button } from 'react-bootstrap'

export default function PrompterControls(props) {
  let { onFlip, onScrollPrompter } = props
  return (
    <div className='PrompterControls'>
        <Button
          bsStyle="primary"
          onClick={() => onFlip()}>
            Mirror Text
        </Button>
        <Button onClick={() => {
          onScrollPrompter('forward')
        }}>Scroll</Button>

        <Button onClick={() => {
          onScrollPrompter('backward')
        }}>Reverse</Button>
    </div>
  )
}
