import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { login, doAuthentication, logout } from './actions/actions'

import Navigation from './containers/Navigation'

export class Container extends React.Component {
  constructor(props, context) {
    super(props)
    this.props.doAuthentication(context.router)
  }

  render() {
    const { isAuthenticated, profile } = this.props

    return (
      <Navigation isAuthenticated={isAuthenticated} profile={profile}>
        {this.props.children}
      </Navigation>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

const mapStateToProps = (state) => {
  const { auth } = state
  const { isAuthenticated, profile } = auth
  return {
    isAuthenticated,
    profile
  }
}

export default connect(mapStateToProps, {
  login,
  doAuthentication,
  logout
})(Container);
