import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class PrompterControls extends Component {
  render() {
    return (
      <div className='PrompterControls'>
          <Button
            bsStyle="primary"
            onClick={() => this.props.onFlip()}>
              Mirror Text
          </Button>
          <Button onClick={() => {
            this.props.onScrollPrompter('forward')
          }}>Scroll</Button>

          <Button onClick={() => {
            this.props.onScrollPrompter('backward')
          }}>Reverse</Button>
      </div>
    )
  }
}

export default PrompterControls
