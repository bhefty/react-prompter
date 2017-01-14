import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'

import Navigation from './containers/Navigation'

export class Container extends React.Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <Navigation auth={this.props.route.auth}>
        {children}
      </Navigation>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default connect()(Container);
