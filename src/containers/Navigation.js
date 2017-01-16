import React, { Component, PropTypes as T } from 'react'
import { Grid, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import * as actions from '../actions/actions'

class Navigation extends Component {
  constructor(props, context) {
    super(props, context)
    this.onNavItemClick = this.onNavItemClick.bind(this)
  }

  onNavItemClick() {
    let { dispatch } = this.props
    if(!this.props.isAuthenticated) {
      dispatch(actions.login())
    } else {
      dispatch(actions.logout())
      this.context.router.push('/login')
    }
  }

  render() {
    let isLoggedIn = this.props.isAuthenticated
    let authLink = (isLoggedIn ? 'Logout' : 'Login')
    let greeting = (isLoggedIn ? `Hello, ${this.props.profile.nickname}!` : '')
    let scriptsLink
    if (isLoggedIn) scriptsLink = (<LinkContainer to='/home'><NavItem eventKey={2}>Scripts</NavItem></LinkContainer>)
    return (
      <div>
        <Navbar inverse staticTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'>React Prompter</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to='/demo'>
                  <NavItem eventKey={1}>Quick Entry</NavItem>
                </LinkContainer>
                {scriptsLink}
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} disabled>{greeting}</NavItem>
                <NavItem eventKey={2} onClick={this.onNavItemClick}>{authLink}</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
        {this.props.children}
      </div>

    )
  }
}

Navigation.contextTypes = {
  router: T.object
}

export default connect()(Navigation)
