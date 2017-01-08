import React, { PropTypes as T } from 'react'

import Navigation from './components/Navigation'

export class Container extends React.Component {
  static contextTypes = {
    router: T.object
  }

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

export default Container;
